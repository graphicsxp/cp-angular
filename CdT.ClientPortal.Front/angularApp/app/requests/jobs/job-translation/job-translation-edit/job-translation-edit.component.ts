import { EntityManagerService } from './../../../../entity-manager.service';
import { Component, OnInit } from '@angular/core';
import { JobBaseEditComponent } from '../../job-base/job-base-edit.component';

@Component({
  selector: 'cdt-job-translation-edit',
  templateUrl: './job-translation-edit.component.html',
  styleUrls: ['./job-translation-edit.component.scss']
})
export class JobTranslationEditComponent extends JobBaseEditComponent implements OnInit {

  constructor(protected _entityManagerService: EntityManagerService) { super(_entityManagerService); }

  ngOnInit() {
  }

  canCopyDown(job) { return false; }

}
