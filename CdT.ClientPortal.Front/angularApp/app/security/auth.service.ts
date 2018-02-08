import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './model/user.model';

@Injectable()
export class AuthService {

  public userInformation: User;
  public loggedIn: boolean;

  constructor(private http: HttpClient) {
    // try to set the current user from localStorage if it exists
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.userInformation = JSON.parse(user);
      this.loggedIn = true;
    } else {
      this.userInformation = new User();
      this.userInformation.userName = 'guest';
      this.loggedIn = false;
    }
  }

  public getToken(): string {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const currentUser = JSON.parse(user);
      return currentUser.access_token;
    } else {
      return null;
    }
  }

  public login(userName: string, password: string): Observable<any> {
    // call token provider
    const url = 'http://localhost/cdt.clientportal.webapi/token';

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = new HttpParams()
      .set('username', userName)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post(url, params, { headers: headers })
      .map(
        res => {
          if (res && res['access_token']) {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.userInformation = res as User;
            this.loggedIn = true;
          }
        },
        err => {
          console.log('Error occurred');
        }
      );
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userInformation.access_token = '';
    this.userInformation.userName = 'guest';
    this.loggedIn = false;
  }
}
