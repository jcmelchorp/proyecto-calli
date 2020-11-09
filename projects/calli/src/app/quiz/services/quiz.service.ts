import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Question, Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  /**
   * Creates a new quiz for the current user
   */
  async createQuiz(data: Quiz): Promise<DocumentReference> {
    const user = await this.afAuth.currentUser;
    return this.db.collection('quizes').add({
      ...data,
      uid: user.uid,
      questions: [{ question: 'Hello!', label: 'yellow' }]
    });
  }

  async updateQuizInfo(data: Quiz) {
    const userRef: AngularFirestoreDocument = this.db.doc(`quizes/${data.id}`);
    const dbData = {
      id: data.id,
      title: data.title,
      description: data.description,
      priority: data.priority,
      questions: data.questions,
      //areaTag: data.areaTag
    };
    return userRef.set(dbData, { merge: true });
  }
  /**
   * Get all quizs owned by current user
   */
  getUserQuizes(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Quiz>('quizes', ref =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
      // map(quizs => quizs.sort((a, b) => a.priority - b.priority))
    );
  }

  /**
   * Run a batch write to change the priority of each quiz for sorting
   */
  sortQuizes(quizes: Quiz[]): void {
    const db = firebase.default.firestore();
    const batch = db.batch();
    const refs = quizes.map(b => db.collection('quizes').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * Delete quiz
   */
  deleteQuiz(quizId: string): Promise<void> {
    return this.db
      .collection('quizes')
      .doc(quizId)
      .delete();
  }

  /**
   * Updates the tasks on quiz
   */
  updateQuestions(quizId: string, questions: Question[]): Promise<void> {
    return this.db
      .collection('quizes')
      .doc(quizId)
      .update({ questions });
  }

  /**
   * Remove a specifc task from the quiz
   */
  removeQuestion(quizId: string, question: Question): Promise<void> {
    return this.db
      .collection('quizes')
      .doc(quizId)
      .update({
        questions: firebase.default.firestore.FieldValue.arrayRemove(question)
      });
  }
}
