import { Service } from './../../../model/breeze/service';
import { Priority } from './../../../model/breeze/priority';
import { SourceMaterial } from './../../../model/breeze/source-material';
import { Component, OnInit, Input } from '@angular/core';

/**
 *  Base component for displaying and managing the jobs of a given SourceMaterial
*/
@Component({})
export abstract class JobBaseComponent implements OnInit {

  @Input() sourceMaterial: SourceMaterial;
  @Input() priority: Priority;
  @Input() service: Service;

  constructor() { }

  ngOnInit() {
  }

}
