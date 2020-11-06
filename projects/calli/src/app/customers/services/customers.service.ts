import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { of } from 'rxjs';

import * as firebase from 'firebase/app';

import { switchMap } from 'rxjs/operators';

import { Customer } from './../models/customer.model';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private userId: string;
  private userTkn: string;
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.userTkn = user.refreshToken;
      }
    });
  }

  add(customer: Customer, userId: string) {
    this.afs.collection('customers').add({
      ...customer,
      uid: userId,
    });
    const customers = this.db.list(`customers/${userId}`);
    return customers.push(customer);
  }

  addCustomers(customers: Customer[]) {
    if (this.userId) {
      customers.forEach((customer: Customer) => {
        this.db.list(`customers/${this.userId}`).push(customer);
      });
    }
  }

  get(userId: string) {
    return this.db.list(`customers/${userId}`).snapshotChanges();
  }

  update(customer: Customer, userId: string) {
    return of(this.db.object(`customers/${userId}/` + customer.key)
      .update({
        id: customer.id,
        name: customer.name,
        description: customer.description,
      }));
  }

  delete(customer: Customer, userId: string) {
    return this.db.object(`customers/${userId}/` + customer.key).remove();
  }
  /**
   * Creates a new customer in firestore for the current user
   */
  async create(data: Customer): Promise<DocumentReference> {
    const user = await this.afAuth.currentUser;
    /* Realtime Database*/
    /* this.db.list(`boards/${user.uid}`).push({
      ...data,
      uid: user.uid,
      task: [{ description: 'Hello!', label: 'yellow' }]
    }); */
    /** Firestore  */
    return this.afs.collection('customers').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello!', label: 'yellow' }]
    });
  }

  /**
   * Get all boards owned by current user
   */
  getUserCustomers() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          /* Realtime Database*/
          // this.db.list<Board[]>(`boards/${user.uid}/`, ref => ref.orderByChild('priority')).valueChanges();
          /** Firestore  */
          return this.afs
            .collection<Customer>('customers', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('name'))
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
      // map(boards => boards.sort((a, b) => a.priority - b.priority))
    );
  }
  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Customer[]): void {
    /** Firestore  */
    const db = firebase.default.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.key));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
