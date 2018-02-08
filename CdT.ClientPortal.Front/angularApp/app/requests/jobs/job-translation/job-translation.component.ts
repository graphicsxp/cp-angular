import { JobBaseComponent } from './../job-base/job-base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cdt-job-translation',
  templateUrl: './job-translation.component.html',
  styleUrls: ['./job-translation.component.scss']
})
export class JobTranslationComponent extends JobBaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }
}
