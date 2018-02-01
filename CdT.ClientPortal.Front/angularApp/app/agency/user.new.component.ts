import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AgencyService } from './agency.service';

@Component({
  templateUrl: './user.new.component.html',
  styleUrls: ['./user.new.component.scss']
})

export class UserNewComponent implements OnInit {

  constructor(private agencyService: AgencyService) {

  }

  ngOnInit() {
    console.log('test agency');
  }

  public onSave(): void {
    this.agencyService.createUser({
      userName: 'nullela',
      email: 'laurent.nullens@ext.cdt.europa.eu',
      firstName: 'Laurent',
      lastName: 'Nullens',
      phoneNume: 304,
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
