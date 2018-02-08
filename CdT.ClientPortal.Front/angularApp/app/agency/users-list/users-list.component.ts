import { Component, OnInit } from '@angular/core';

import { ToasterService } from 'angular2-toaster';

import { UserService } from '../users.service';
import { ClientPortalUser, ClientPortalUserList } from '../model/clientPortalUser.model';

@Component({
  selector: 'cdt-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users: ClientPortalUser[];

  constructor(private _userService: UserService, private _toasterService: ToasterService) {
    this.users = [];
    this._userService.getAllUsers().subscribe(
      users => {
        for (const u of users) {
          this.users.push(u);
        }
      },
      err => {
        this._toasterService.pop('error', 'Get users', err.error.Message);
      }
    );
  }

  toggleUserApproved(user: ClientPortalUserList) {
    this._userService.toggleUserApproved(user.UserName).subscribe(
      res => {
        this._toasterService.pop('success', 'Get users', `User ${user.UserName} updated`);
        this._userService.getAllUsers().subscribe(
          users => {
            this.users = [];
            for (const u of users) {
              this.users.push(u);
            }
          },
          err => {
            this._toasterService.pop('error', 'Get users', err.error);
          }
        );
      },
      err => {
        this._toasterService.pop('error', 'Get users', err.error);
      }
    );
  }

  unlockUser(user: ClientPortalUserList) {
    this._userService.unlockUser(user.UserName).subscribe(
      res => {
        this._toasterService.pop('success', 'Get users', `User ${user.UserName} unlocked`);
        this._userService.getAllUsers().subscribe(
          users => {
            this.users = [];
            for (let user of users) {
              this.users.push(user);
            }
          },
          err => {
            this._toasterService.pop('error', 'Get users', err.error);
          }
        );
      },
      err => {
        this._toasterService.pop('error', 'Get users', err.error);
      }
    );
  }

  ngOnInit() { }
}
