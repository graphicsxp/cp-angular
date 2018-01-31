import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './user.new.component.html',
  styleUrls: ['./user.new.component.scss']
})

export class UserNewComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    console.log('test agency');
  }

  public onSave(): void {
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
