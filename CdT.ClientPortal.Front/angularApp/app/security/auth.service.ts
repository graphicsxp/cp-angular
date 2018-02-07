import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public login(userName: string, password: string): Observable<any> {
    // call token provider
    let url = 'http://localhost/cdt.clientportal.webapi/token';

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = new HttpParams()
      .set('username', userName)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post(url, params, { headers: headers })
      .map(
      res => {
        localStorage.setItem('token', res.access_token);
      },
      err => {
        console.log('Error occured');
      }
      );
  }
}
