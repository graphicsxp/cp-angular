
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClientPortalUser } from './model/clientPortalUser.model';

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) {
  }

  public createUser(newUser: ClientPortalUser): Observable<any> {
    return this._http.post('http://localhost/cdt.clientportal.webapi/api/UserManagement/SaveUser',
      {
        userName: newUser.userName,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        isApproved: true
      })/*.subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
      )*/;
  }
  public getAllUsers(): Observable<any> {
    return this._http.get('http://localhost/cdt.clientportal.webapi/api/UserManagement/GetAllUsers')
  }

  public toggleUserApproved(userName: string): Observable<any> {
    return this._http.post('http://localhost/cdt.clientportal.webapi/api/UserManagement/ToggleUserApproved', '"' + userName + '"', { headers: { 'Content-Type': 'application/json' } });
  }

  public unlockUser(userName: string): Observable<any> {
    return this._http.post('http://localhost/cdt.clientportal.webapi/api/UserManagement/UnlockUser', '"' + userName + '"', { headers: { 'Content-Type': 'application/json' } });
  }
}
