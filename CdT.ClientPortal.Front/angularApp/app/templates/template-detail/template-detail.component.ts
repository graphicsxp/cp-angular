import { RequestTemplate } from './../../model/request-template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '../templates.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent implements OnInit {

  public template: RequestTemplate;

  constructor(private _route: ActivatedRoute, private _templateService: TemplateService) { }

  @ViewChild('templateForm') currentForm: NgForm;

  ngOnInit() {
    this._route.data.subscribe((data: { template: RequestTemplate }) => {
      this.template = data.template;
    })
  }

  onSave(){
    
  }
}
