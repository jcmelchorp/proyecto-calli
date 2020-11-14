import { AngularFireDatabase } from '@angular/fire/database';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Question, Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private userId: string;
  private userTkn: string;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.userTkn = user.refreshToken;
      }
    });
  }
  /**
   * Get all quizs owned by current user
   */
  getUserQuizes(userId: string) {
    return this.afs
      .collection<Quiz>('quizes', (ref) =>
        ref.where('fsId', '==', userId).orderBy('priority')).valueChanges({ idField: 'fsId' });
  }

  get(userId: string) {
    return this.db.list(`quizes/${userId}`).snapshotChanges();
    // return this.db.list<Quiz>(`quizes/${userId}/`, ref => ref.orderByChild('priority')).snapshotChanges();
  }

  /**
   * Creates a new quiz for the current user
   */
  createQuiz(data: Quiz, userId: string): Promise<void> {
    //const dbKey = this.db.createPushId();
    const fsKey = this.afs.createId();
    this.db.list(`quizes/${userId}`).push({ ...data, fsId: fsKey });
    return this.afs.collection('quizes').doc(fsKey).set({
      ...data,
      uid: userId,
      fsId: fsKey
    });
  }
  /**
   * Update a partial Quiz Info for the current User
   */
  update(quiz: Quiz, userId: string) {
    return of(
      this.db.object(`quizes/${userId}/` + quiz.dbId).update({
        title: quiz.title,
        isActive: quiz.isActive,
        description: quiz.description,
        priority: quiz.priority,
      }).then(() => this.updateQuizInfo(quiz)));
  }

  updateQuizInfo(data: Quiz) {
    this.afs.collection('quizes').doc(data.fsId).update({
      title: data.title,
      isActive: data.isActive,
      description: data.description,
      priority: data.priority,
    });

  }

  // map(quizs => quizs.sort((a, b) => a.priority - b.priority))


  /**
   * Run a batch write to change the priority of each quiz for sorting
   */
  sortQuizes(quizes: Quiz[]): void {
    const db = firebase.default.firestore();
    const batch = db.batch();
    const refs = quizes.map(b => db.collection('quizes').doc(b.fsId));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Delete quiz
   */
  deleteQuiz(quiz: Quiz, userId: string): Promise<void> {
    this.db.object(`quizes/${userId}/${quiz.dbId}`).remove();
    return this.afs
      .collection('quizes')
      .doc(quiz.fsId)
      .delete();
  }

  /**
   * Updates the tasks on quiz
   */
  updateQuestions(quizId: string, questions: Question[]): Promise<void> {
    return this.afs
      .collection('quizes')
      .doc(quizId)
      .update({ questions });
  }

  /**
   * Remove a specifc task from the quiz
   */
  removeQuestion(quizId: string, question: Question): Promise<void> {
    return this.afs
      .collection('quizes')
      .doc(quizId)
      .update({
        questions: firebase.default.firestore.FieldValue.arrayRemove(question)
      });
  }
}
