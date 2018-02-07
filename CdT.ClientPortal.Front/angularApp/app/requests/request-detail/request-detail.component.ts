import { EntityManagerService } from './../../entity-manager.service';
import { Observable } from 'rxjs/Observable';
import { Purpose, Department, DeliveryMode, Request } from './../../model/breeze/entity-model';
import { RequestService } from './../services/request.service';
import { ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { Contact } from '../../model/breeze/contact';
import { EntityState } from 'breeze-client';
import { ToasterService } from 'angular2-toaster';
import { LookupNames } from '../../model/lookups';
import { NavigationExtras } from '@angular/router/src/router';
import { SourceMaterialsListComponent } from '../source-materials-list/source-materials-list.component';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'cdt-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss'],
})
export class RequestDetailComponent implements OnInit {

  public title: String = '';
  public request: Request;
  public selectedDepartment: Department;
  public purposes: Purpose[];
  public deliveryModes: DeliveryMode[];
  public templates: any[];
  public filteredTemplateList: any[];
  public activeContacts: Contact[];
  public selectedContacts: Contact[];
  public selectedRecipients: Contact[];

  @ViewChild('requestForm') requestForm: NgForm;
  @ViewChild('templateList') templateList;
  @ViewChild('sourceMaterialList') private sourceMaterialList: SourceMaterialsListComponent;

  constructor(
    private _requestService: RequestService,
    private _entityManagerService: EntityManagerService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toasterService: ToasterService,
    private _confirmationService: ConfirmationService) {
    // this.filteredTemplateList = this.templates.slice();
  }

  ngOnInit() {
    this._route.data.subscribe((data: { request: Request }) => {
      this.request = data.request;
    })
    this.purposes = this._requestService.getLookup(LookupNames.purposes);
    this.deliveryModes = this._requestService.getLookup(LookupNames.deliveryModes);
    // this.templates = this._requestService.getLookup(LookupNames.RequestTemplate).map(t => { return { text: t.templateName, value: t.id } });
    // this.filteredTemplateList = this.templates.slice();
    this.activeContacts = _.filter(this.request.client.contacts, { 'isActive': true });
    this.selectedContacts = [];
    this.selectedRecipients = [];

    this.request.requestContacts.forEach((reqContact) => {
      if (reqContact.entityAspect.entityState !== EntityState.Deleted) {
        this.selectedContacts.push(reqContact.contact);
      }
    });

    this.request.requestDeliveryContacts.forEach((rdc) => {
      if (rdc.entityAspect.entityState !== EntityState.Deleted) {
        this.selectedRecipients.push(rdc.contact);
      }
    });
  }

  /**
   * This is the callback function triggered when the multiselect datasource has changed.
   * We assign the new contacts and we must notify breeze that the request has changed.
   * This is because of m-2-m association.
   * @param event The event contains the new array of values
   */
  onSelectedContactsChanged(event) {
    this.selectedContacts = event;
    this._entityManagerService.triggerStatusNotification(this.request);
  };

  /**
   * This is the callback function triggered when the multiselect datasource has changed.
   * We assign the new recipients and we must notify breeze that the request has changed.
   * This is because of m-2-m association.
   * @param event The event contains the new array of values
   */
  onSelectedRecipientsChanged(event) {
    this.selectedRecipients = event;
    this._entityManagerService.triggerStatusNotification(this.request);
  };

  handleFilter(value) {
    this.filteredTemplateList = this.templates.filter((s) => s.text.toLowerCase().indexOf(value.value.text.toLowerCase()) !== -1);
  }

  canSelectDepartment(): Boolean {
    return true;
  }

  onSave(): void {
    this._beforeSave().then(() => {
      this._save().then(() => {
        if (this._route.snapshot.params['id'] === 'new') {
          const ne: NavigationExtras = { skipLocationChange: true };
          this._router.navigateByUrl(`requests/detail/${this.request.id}`, ne);
        }
      })
    });
  }

  canSave(): boolean {
    /*!vm.sourceLanguagesChanged && !vm.many2manyHasChanged && !hasChanges()) || hasErrors() */
    return this._entityManagerService.hasChanges() && !this._hasErrors();
  }

  onNext() {
    if (this._entityManagerService.hasChanges()) {
      this._beforeSave().then(() => {
        this._save().then(() => {
          this._router.navigateByUrl(`requests/detail/${this.request.id}/jobs`);
        })
      })
    } else {
      this._router.navigateByUrl(`requests/detail/${this.request.id}/jobs`);
    }
  }

  /**
   * Check if the next button can be enabled
   */
  canClickNext() {
    return this.request.sourceMaterials.length > 0 && !_.every(this.request.sourceMaterials, { isScreenDeleted: true });
  };

  public hasRightToSend(): boolean {
    return true;
  }

  private _beforeSave(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.sourceMaterialList.hasSourceLanguagesChanged) {
        this._confirmationService.confirm({
          rejectVisible: false,
          // acceptLabel: 'OK',
          message: `You have made changes on the source languages. In case of replacing/removing one source language the existing
           jobs for that language will be DELETED. Please make sure the job definitions are in order before sending the request.`,
          accept: () => {
            // $scope.checkJobSourceLanguage();
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  private _save(): Promise<any> {
    if (this.requestForm.invalid) { return };

    this._entityManagerService.checkMany2ManyModifications('RequestContact', this.request, this.selectedContacts, this.request.requestContacts, 'request', 'contact', false);
    this._entityManagerService.checkMany2ManyModifications('RequestDeliveryContact', this.request, this.selectedRecipients, this.request.requestDeliveryContacts, 'request', 'contact', false);

    this.sourceMaterialList.onSave();
    // var promise = null;
    // if (sourceMaterialsToDelete.length > 0) {
    //     promise = _updateTATOnDeleteSourceDocuments();
    // } else {
    //     promise = $q.resolve(true);
    // }

    return new Promise((resolve, reject) => this._requestService.save().then(() => {
      this._toasterService.pop('success', 'The request was saved successfully !');
      this.sourceMaterialList.hasSourceLanguagesChanged = false;
      resolve();
    }, error => {
      if (!error.entityErrors && error.message) {
        this._toasterService.pop('failed', error.message);
      }
      reject(error);
    }));
  }

  private _hasErrors(): boolean {
    let many2ManyHasErrors = this.selectedContacts.length === 0 || this.selectedRecipients.length === 0;
    // selected source languages check
    many2ManyHasErrors = many2ManyHasErrors || _.chain(this.request.sourceMaterials).map('selectedLanguages').some(function (elem) {
      return elem.length === 0;
    }).value();
    return many2ManyHasErrors || this._entityManagerService.hasErrors(this.request, 'sourceMaterials');
  }
}

