
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ClientPortalUser } from './clientPortalUser.model';

@Injectable()
export class AgencyService {

  constructor(private http: HttpClient) {
  }

  public createUser(newUser: ClientPortalUser): Observable<any> {
    return this.http.post('http://localhost/cdt.clientportal.webapi/api/UserManagement/SaveUser',
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
}
