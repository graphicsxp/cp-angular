import { Client } from './../../model/breeze/client';
import { Request } from './../../model/breeze/request';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHeaderComponent } from './request-header.component';
import { Component, ViewChild } from '@angular/core';

describe('RequestHeaderComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestHeaderComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    const request: Request = new Request();
    const client: Client = new Client();
    client.abbreviation = 'CDT';
    request.requestIdentifier = '2018/000001';
    request.client = client;
    component.requestHeaderComponent.request = request;
    fixture.detectChanges();
  });

  it('should have the title REQUEST CDT 2018/000001 / REQUEST DETAILS', () => {
    expect(fixture.nativeElement.querySelector('h1').innerText).toEqual('REQUEST CDT 2018/000001 / REQUEST DETAILS');
  });

  @Component({
    selector: `cdt-host-component`,
    template: `<cdt-request-header></cdt-request-header>`
  })
  class TestHostComponent {
    @ViewChild(RequestHeaderComponent)
    public requestHeaderComponent: RequestHeaderComponent;
  }
});
