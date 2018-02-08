import { HttpClient } from '@angular/common/http';
import { UserService } from './../users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GridHelpersModule } from './../../grid-helpers/grid-helpers.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { SharedModule } from '../../shared/shared.module';
import { ToasterService } from 'angular2-toaster';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, BrowserModule, HttpClientModule, SharedModule, GridHelpersModule],
      declarations: [UsersListComponent],
      providers: [UserService, HttpClient, ToasterService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
