import { JobBaseComponent } from './../job-base/job-base.component';
import { Component, OnInit } from '@angular/core';
import { EntityManagerService } from '../../../entity-manager.service';

@Component({
  selector: 'cdt-job-translation',
  templateUrl: './job-translation.component.html',
  styleUrls: ['./job-translation.component.scss']
})
export class JobTranslationComponent extends JobBaseComponent implements OnInit {

  public applyPricingPolicy: boolean;

  constructor(protected _entityManagerService: EntityManagerService) { super(_entityManagerService); }

  ngOnInit() {
  }
}
