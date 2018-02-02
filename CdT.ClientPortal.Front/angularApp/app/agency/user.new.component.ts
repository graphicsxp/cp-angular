import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AgencyService } from './agency.service';
import { ToasterService } from 'angular2-toaster';

import { ClientPortalUser } from './clientPortalUser.model';

@Component({
  templateUrl: './user.new.component.html',
  styleUrls: ['./user.new.component.scss']
})

export class UserNewComponent implements OnInit {

  public user: ClientPortalUser;

  constructor(private agencyService: AgencyService, private toasterService: ToasterService) {
    this.user = new ClientPortalUser();
  }

  ngOnInit() {
  }

  public onSave(): void {
    this.agencyService.createUser(this.user)
      .subscribe(
      res => {
        this.toasterService.pop('success', 'Creating user', `User ${res.UserName} successfully created`);
        console.log(res);
      },
      err => {
        this.toasterService.pop('error', 'creating user', err.error);
        console.log('Error occurred');
      }
      );
  }
}
