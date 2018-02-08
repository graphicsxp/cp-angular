import { Component, OnInit } from '@angular/core';
import { JobBaseComponent } from '../../job-base/job-base.component';

@Component({
  selector: 'cdt-job-translation-edit',
  templateUrl: './job-translation-edit.component.html',
  styleUrls: ['./job-translation-edit.component.scss']
})
export class JobTranslationEditComponent extends JobBaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
