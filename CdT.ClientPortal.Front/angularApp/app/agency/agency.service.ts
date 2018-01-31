
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AgencyService {

  constructor(private http: HttpClient) {
  }

  public createUser(newUser: any): void {
    this.http.post('http://localhost/cdt.clientportal.webapi/api/UserManagement/SaveUser',
      {
        userName: 'nullela',
        email: 'laurent.nullens@ext.cdt.europa.eu',
        firstName: 'Laurent',
        lastName: 'Nullens',
        phoneNume: 304,
        isApproved: true
      }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
      );
  }
}
