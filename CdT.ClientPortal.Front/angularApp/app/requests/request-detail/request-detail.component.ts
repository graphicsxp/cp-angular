import { EntityManagerService } from './../../entity-manager.service';
import { Observable } from 'rxjs/Observable';
import { Purpose, Department, DeliveryMode, Request } from './../../model/entity-model';
import { RequestService } from './../requests.service';
import { ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { Contact } from '../../model/contact';
import { EntityState } from 'breeze-client';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
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
  @ViewChild("templateList") templateList;

  constructor(private _requestService: RequestService, private _entityManagerService: EntityManagerService, private _route: ActivatedRoute, private _router: Router) {
    //this.filteredTemplateList = this.templates.slice();
  }

  ngOnInit() {
    this._route.data.subscribe((data: { request: Request }) => {
      this.request = data.request;
    })
    this.purposes = this._requestService.getPurposes();
    this.deliveryModes = this._requestService.getDeliveryModes();
    this.templates = this._requestService.getRequestTemplates().map(t => { return { text: t.templateName, value: t.id } });
    this.filteredTemplateList = this.templates.slice();
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
   * filter the list of templates
   */
  handleFilter(value) {
    this.filteredTemplateList = this.templates.filter((s) => s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  canSelectDepartment(): Boolean {
    return true;
  }

  onSave(): void {
    if (this.requestForm.invalid) return;

    this._entityManagerService.checkMany2ManyModifications('RequestContact', this.request, this.selectedContacts, this.request.requestContacts, 'request', 'contact', false);
    this._entityManagerService.checkMany2ManyModifications('RequestDeliveryContact', this.request, this.selectedRecipients, this.request.requestDeliveryContacts, 'request', 'contact', false);

    this._requestService.save().then(() => {
      this._router.navigate(['requests']);
    }, error => {
      if (!error.entityErrors && error.message) {
        //use toaster and intercept elsewhere
        //this.errorMessage = error.message;
      }
    });
  }
  
  canSave(): boolean{
     /*!vm.sourceLanguagesChanged && !vm.many2manyHasChanged && !hasChanges()) || hasErrors() */
     return  this._entityManagerService.hasChanges();
  }
}
