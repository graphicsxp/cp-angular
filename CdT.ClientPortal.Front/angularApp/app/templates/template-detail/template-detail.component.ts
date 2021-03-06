import { RequestTemplate } from './../../model/breeze/request-template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '../templates.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cdt-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {

  public template: RequestTemplate;

  @ViewChild('templateForm') currentForm: NgForm;

  constructor(private _route: ActivatedRoute, private _templateService: TemplateService) { }

  ngOnInit() {
    this._route.data.subscribe((data: { template: RequestTemplate }) => {
      this.template = data.template;
    })
  }

  onSave() { }
}
