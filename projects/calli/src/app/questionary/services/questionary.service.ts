import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Observable, Subscription } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

import { Questionary } from './../models/questionary.model';
import { User } from '../../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionaryService {
  sub: Subscription;
  questionaries$: Observable<Questionary>;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  /**
   * Creates a new quiz for the current user
   */
  async createQuestionary(data: Questionary): Promise<DocumentReference> {
    const user = await this.afAuth.currentUser;
    return this.db.collection('questionaries').add({
      ...data,
      uid: user.uid,
      questions: [{ questionText: 'Pregunta 1', description: '', label: 'white' }]
    });
  }

  removeQuestion(quizId: any, question: any): void {
    throw new Error('Method not implemented.');
  }

  getUserQuestionaries(user: User) {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Questionary[]>('questionaries', ref =>
              ref.where('uid', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
      // map(quizs => quizs.sort((a, b) => a.priority - b.priority))
    );
  }
  dispose(): void {
    this.sub.unsubscribe();
    this.questionaries$ = null;
  }
}
