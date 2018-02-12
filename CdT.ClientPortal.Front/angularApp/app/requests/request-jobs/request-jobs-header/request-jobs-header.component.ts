import { Request } from './../../../model/breeze/request';
import { DocumentFormat } from './../../../model/breeze/document-format';
import { RequestService } from './../../services/request.service';
import { Priority } from './../../../model/breeze/priority';
import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../../model/breeze/service';
import { LookupNames } from '../../../model/lookups';
import * as _ from 'lodash';

@Component({
  selector: 'cdt-request-jobs-header',
  templateUrl: './request-jobs-header.component.html',
  styleUrls: ['./request-jobs-header.component.scss']
})
export class RequestJobsHeaderComponent implements OnInit {

  public selectedService: Service;
  public selectedPriority: Priority;
  public receiptDate: Date;
  public services: Array<Service>;
  public priorities: Array<Priority>;

  @Input() request: Request;
  @Input() disabled: boolean;

  constructor(public requestService: RequestService) { }

  ngOnInit() {
    this.services = this.requestService.getLookup(LookupNames.services);
    this.priorities = this.requestService.getLookup(LookupNames.priorities);

    if (!this.requestService.hasJobs(this.request)) {
      if (this.request.requestTemplate && this.request.requestTemplate.service) {
        // if there are no jobs but we are using a request template
        this.selectedPriority = _.find(this.requestService.getLookup(LookupNames.priorities), { code: 'NO' });
        this.selectedService = this.request.requestTemplate.service;
      } else {
        // if there are no jobs
        this.selectedPriority = _.find(this.requestService.getLookup(LookupNames.priorities), { code: 'NO' });
        // if every source materials have a suitable extension for subtitling service then we set the service to Subtitling otherwise we set it to Translation
        if (_.every(this.request.sourceMaterials, (sm) => { return _.includes(DocumentFormat.validSubtitlingFormatCodes, sm.deliverableDocumentFormat.code); })) {
          this.selectedService = _.find(this.requestService.getLookup(LookupNames.services), { code: 'ST' });
        } else {
          this.selectedService = _.find(this.requestService.getLookup(LookupNames.services), { code: 'TR' });
        }
      }
    } else {
      // there are jobs on the request so set priority and service from the first job found
      const job = _.chain(this.request.sourceMaterials).map('jobs').flatten().value()[0];
      this.selectedPriority = _.find(this.requestService.getLookup(LookupNames.priorities), { code: job.priority.code });
      this.selectedService = _.find(this.requestService.getLookup(LookupNames.services), { code: job.service.code });
    }
  }

  /**
  * The priority cannot be VeryUrgent  if at least one job has more than 5 pages or for service Modification, Editing, Revision.
 */
  public isPriorityInvalid(): Boolean {
    if (this.selectedPriority.code === 'VU') {
      if (this.selectedService.unit.code === 'PG') {
        return _.chain(this.requestService.currentRequest.sourceMaterials).map('jobs').flatten().some(job => { return job.clientVolume > 7500; })
      } else {
        return (this.selectedService.code === 'MO' || this.selectedService.code === 'ED' || this.selectedService.code === 'RE');
      }
    }

    return false;
  };

  checkInvalidServices(): Boolean { return true; }
  onServiceChanged() { }
  addReferences() { }
  onPriorityChanged() { }
}
