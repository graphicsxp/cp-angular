import { Observable } from 'rxjs/Observable';
import { Purpose, Department, DeliveryMode } from './../../model/entity-model';
import { RequestService } from './../requests.service';
import { ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  @ViewChild('requestForm') requestForm: NgForm;
  @ViewChild("templateList") templateList;

  constructor(private _requestService: RequestService, private _route: ActivatedRoute, private _router: Router) {
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
    this._requestService.save().then(() => {
      this._router.navigate(['requests']);
    }, error => {
      if (!error.entityErrors && error.message) {
        //use toaster and intercept elsewhere
        //this.errorMessage = error.message;
      }
    });
  }
}
