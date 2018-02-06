import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { UserService } from '../users.service';
import { ClientPortalUser } from '../model/clientPortalUser.model';

@Component({
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {

  public user: ClientPortalUser;

  constructor(private userService: UserService, private toasterService: ToasterService) {
    this.user = new ClientPortalUser();
  }

  ngOnInit() {
  }

  public onSave(): void {
    this.userService.createUser(this.user)
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
