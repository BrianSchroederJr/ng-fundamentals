import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {

  currentUser: IUser;

  constructor(private http: HttpClient) {}

  // johnpapa  -  a valid login.  Check the npm server code for other valid logins
  loginUser(userName: string, password: string) {

    let loginInfo = { username: userName, password: password };
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post('/api/login', loginInfo, options)
    .pipe(tap(data => { this.currentUser = <IUser>data['user']; }))
    .pipe(catchError(err => { return of(false); }));  // Return false if any error logging in.

    // this.currentUser = {
    //   id: 1,
    //   firstName: 'John',
    //   lastName: 'Papa',
    //   userName: userName
    // };
  }

  logout() {
    this.currentUser = undefined;
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('/api/logout', {}, options);
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
    .pipe(tap(data => {                 // This way makes it easy to remove the .subscribe() and add return before this.http... to then let the caller subscribe() if the data is needed down the line.
      if (data instanceof Object) {
        this.currentUser = <IUser>data;
        }
    }
    ))
    .subscribe();
    // .subscribe(data => {             // One way to do this
    //   if (data instanceof Object) {
    //     this.currentUser = <IUser>data;
    //   }
    // });
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

}
