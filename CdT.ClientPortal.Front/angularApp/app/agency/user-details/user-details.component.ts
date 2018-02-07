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

  constructor(private _userService: UserService, private _toasterService: ToasterService) {
    this.user = new ClientPortalUser();
  }

  ngOnInit() {
  }

  public onSave(): void {
    this._userService.createUser(this.user)
      .subscribe(
        res => {
          this._toasterService.pop('success', 'Creating user', `User ${res.UserName} successfully created`);
          console.log(res);
        },
        err => {
          this._toasterService.pop('error', 'creating user', err.error);
          console.log('Error occurred');
        }
      );
  }
}
