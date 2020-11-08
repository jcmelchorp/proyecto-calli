import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of, from } from 'rxjs';

import { UserAdmin } from '../../models/user-admin.model';
import { FirebaseService } from '../../services/firebase.service';
import { UsersState } from './../../store/users.state';
import {
  LoadUsers
} from '../../store/actions/users.actions';
import { getUsers } from '../../store/selectors/users.selectors';

@Component({
  selector: 'calli-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  items: UserAdmin[];
  ageFilteredItems: Array<any>;
  nameFilteredItems: Array<any>;
  items$: Observable<UserAdmin[]>;

  ageValue = 0;
  searchValue = '';

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private store: Store<UsersState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadUsers());
    this.getData();
  }

  getData() {
    this.items$ = this.store.select(getUsers);
    this.items$.subscribe(result => {
      this.items = result;
      this.ageFilteredItems = result;
      this.nameFilteredItems = result;
    });
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  viewDetails(item) {
    this.router.navigate(['/details/' + item.id]);
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
      .subscribe(result => {
        this.nameFilteredItems = [];
        result.forEach(item => {
          /* this.nameFilteredItems.push(
            {
              id: item.payload.doc.id,
              ... item.payload.doc.data()
            }
          ); */
        });
        this.items = this.combineLists(this.nameFilteredItems, this.ageFilteredItems);
        this.items$ = of(this.items);
      });
  }

  rangeChange(event) {
    this.firebaseService.searchUsersByAge(event.value)
      .subscribe(result => {
        this.ageFilteredItems = [];
        result.forEach(item => {
          const user = item.payload.doc.data();
          this.ageFilteredItems.push(
            {
              id: item.payload.doc.id,
              user,
            }
          );
        });
        this.items = this.combineLists(this.ageFilteredItems, this.nameFilteredItems);
        this.items$ = of(this.items);
      });
  }

  combineLists(a, b) {
    const result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.id === x.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }
}
