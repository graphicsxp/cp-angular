import { JobPricing } from './../../model/jobPricing';
import { Job } from './../../model/breeze/job';
import { Pipe, PipeTransform } from '@angular/core';
import { SourceMaterial } from '../../model/breeze/entity-model';
import * as _ from 'lodash';

/**
 * Computes the total price for a given SourceMaterial by adding up each job's totalPrice
 */
@Pipe({
  name: 'sourceMaterialPrice'
})

export class SourceMaterialPricePipe implements PipeTransform {
  transform(sourceMaterial: SourceMaterial, ...args: any[]): any {
    if (!sourceMaterial || !sourceMaterial.jobs || sourceMaterial.jobs.length === 0) { return 0; }

    const total = _.sumBy(sourceMaterial.jobs, (job: Job) => {
      if (job.pricings.length > 0) {
        return job.pricings[0].totalPrice;
      } else {
        return 0;
      }
    })
    return 0;
  }
}
