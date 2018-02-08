import { Job } from './../../model/breeze/job';
import { Request } from './../../model/breeze/request';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

/**
 * computes the total price of a request based on the price of each job
 */
@Pipe({
    name: 'requestPrice'
})
export class RequestPricePipe implements PipeTransform {

    transform(request: Request): number {
        if (!request || !request.sourceMaterials || request.sourceMaterials.length === 0) { return 0; }

        let total: number;

        request.sourceMaterials.forEach(sm => {
            const subTotal = _.sumBy(sm.jobs, (job: Job) => {
                if (job.pricings.length > 0) {
                    return job.pricings[0].totalPrice;
                }
            });
            total += subTotal;
        });

        return total;
    }
}
