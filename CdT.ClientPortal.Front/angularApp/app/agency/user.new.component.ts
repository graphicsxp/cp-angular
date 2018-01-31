import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  templateUrl: './user.new.component.html',
  styleUrls: ['./user.new.component.scss']
})

export class UserNewComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    console.log('test agency');
  }
}
