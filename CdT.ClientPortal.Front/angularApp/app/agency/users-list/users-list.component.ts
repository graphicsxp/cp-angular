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

  constructor(private userService: UserService, private toasterService: ToasterService) {
    this.users = [];
    this.userService.getAllUsers().subscribe(
      res => {
        for (let r of res) {
          this.users.push(r);
        }
        console.log(res);
      },
      err => {
        this.toasterService.pop('error', 'Get users', err.error);
        console.log('Error occurred');
      }
    );
  }

  togglerUserApproved(user: ClientPortalUserList) {
    this.userService.toggleUserApproved(user.UserName).subscribe(
      res => {
        this.toasterService.pop('success', 'Get users', `User ${user.UserName} updated`);
        this.userService.getAllUsers().subscribe(
          res => {
            this.users = [];
            for (let r of res) {
              this.users.push(r);
            }
            console.log(res);
          },
          err => {
            this.toasterService.pop('error', 'Get users', err.error);
            console.log('Error occurred');
          }
        );
      },
      err => {
        this.toasterService.pop('error', 'Get users', err.error);
      }
    );
  }

  unlockUser(user: ClientPortalUserList) {
    this.userService.unlockUser(user.UserName).subscribe(
      res => {
        this.toasterService.pop('success', 'Get users', `User ${user.UserName} unlocked`);
        this.userService.getAllUsers().subscribe(
          res => {
            this.users = [];
            for (let r of res) {
              this.users.push(r);
            }
            console.log(res);
          },
          err => {
            this.toasterService.pop('error', 'Get users', err.error);
            console.log('Error occurred');
          }
        );
      },
      err => {
        this.toasterService.pop('error', 'Get users', err.error);
      }
    );
  }


  ngOnInit() {

  }

}
