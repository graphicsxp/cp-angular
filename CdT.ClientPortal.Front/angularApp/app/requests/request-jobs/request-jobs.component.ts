import { SaveOptions } from 'breeze-client';
import { LookupNames } from './../../model/lookups';
import { ConfirmationService } from 'primeng/api';
import { ToasterService } from 'angular2-toaster';
import { EntityManagerService } from './../../entity-manager.service';
import { RequestService } from './../services/request.service';
import { ActivatedRoute } from '@angular/router';
import { Request } from './../../model/breeze/request';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { RequestJobsHeaderComponent } from './request-jobs-header/request-jobs-header.component';

@Component({
  selector: 'cdt-request-jobs',
  templateUrl: './request-jobs.component.html',
  styleUrls: ['./request-jobs.component.scss']
})
export class RequestJobsComponent implements OnInit {

  @ViewChild('requestJobsHeader') requestJobHeaderComponent: RequestJobsHeaderComponent;

  constructor(private _entityManagerService: EntityManagerService,
    public requestService: RequestService,
    private _route: ActivatedRoute,
    private _toasterService: ToasterService,
    private _confirmationService: ConfirmationService) { }

  ngOnInit() {
    this._route.data.subscribe((data: { request: Request }) => {
      if (data.request) {
        this.requestService.currentRequest = data.request;
      }
    });
  }

  // TODO implement (see disableScreen method in old CP)
  isDisabled(): Boolean { return false; }

  onSave = function () {
    this.requestService.currentRequest.sourceMaterials.forEach(sourceMaterial => {
      this._entityManagerService.deleteEntities(sourceMaterial.jobs.filter(job => { return job.isMarkedForDeletion; }), ['jobMaterials']);
    });

    // this.requestService.currentRequest.entityAspect.setModified();

    return this.requestService.save()
      .then(() => {
        // $scope.vm.deadlinesRefreshed = false;
        this._toasterService.pop('success', 'The request was saved successfully !');
      })
      .catch(error => {
        this._toasterService.pop('failed', error.message);
        // an error when sending/MTS the request so we revert back to the old status to sync with the interface
        // if (this.requestService.currentRequest.status.code !== $scope.vm.request.oldStatusCode) { 
        //   $scope.vm.request.status = _.find($scope.vm.statuses, {
        //     code: $scope.vm.request.oldStatusCode
        //   });
        // }
        // throw error;
      });
  };

  cancelRequest() {

    this._confirmationService.confirm({
      message: 'Are you sure that you want to cancel the request ?',
      accept: () => {

        this.requestService.cancel(this.requestService.currentRequest);

        this.requestService.save([this.requestService.currentRequest], new SaveOptions({ resourceName: 'CancelRequest', tag: 'CANC' })).then(function () {
          // if ($state.current.name !== 'requestDetail.item') {
          //   $state.go('requestDetail.item', { id: $scope.vm.request.id });
          // }
        });

      }
    });
  }

  disableScreen() { }

  markToSend() { }

  hasJobChanges() { }

  canSave(): boolean {
    return this._entityManagerService.hasChanges() && !this._hasErrors();
  }

  canClickAction(): boolean {
    return !this._hasErrors() && this._canSubmit() && !this._hasJobChanges();
  }

  canCancelRequest(): boolean {
    return this.requestService.currentRequest.status.code !== 'CANC' &&
      ((!this.requestService.currentRequest.quotationOnly && _.includes(['DRAF', 'MTS', 'PEND'], this.requestService.currentRequest.status.code) ||
        this.requestService.currentRequest.quotationOnly && this.requestService.currentRequest.status.code === 'PEND'));
  };

  private _canSubmit(): boolean {
    // all source materials have at least one job defined with a volume > 0. At least some material should not be marked for deletion
    return _.every(this.requestService.currentRequest.sourceMaterials, sourceMaterial => {
      return sourceMaterial.jobs.length > 0 && _.every(sourceMaterial.jobs, job => { return job.clientVolume > 0; }) &&
        _.some(sourceMaterial.jobs, material => { return material.isMarkedForDeletion !== true; });
    });
  };

  private _hasErrors(): boolean {
    return this._checkComments() || this.requestJobHeaderComponent.isPriorityInvalid()
      || this._entityManagerService.hasErrors(this.requestService.currentRequest, 'sourceMaterials.jobs');
  };

  private _hasJobChanges(): boolean {
    // var changes = dataService.getModifiedEntities();
    // var count = _.filter(changes, function (e) { return e.entityType.shortName.indexOf('Job') > -1; }).length;
    // return count > 0;
    return true;
  };

  /**
  * Check for comments in case the selectedPriority is Scheduled
  * @returns {Boolean} True if it's ok and false if comments are missing
  */
  private _checkComments() {
    // check for empty comments if priority is scheduled
    return (this.requestJobHeaderComponent.selectedPriority.code === 'PR' &&
      (this.requestService.currentRequest.clientComment || this.requestService.currentRequest.clientComment.length === 0));
  }

  hasChanges() { }

  backToDraft() { }

  hasRightToSend() { }
}
