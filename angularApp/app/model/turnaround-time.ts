import { EntityBase } from './entity-base';
import { Priority } from './priority';
import { Service } from './service';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TurnaroundTime extends EntityBase {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    id: string;
    version: number;
    createdBy: string;
    updatedBy: string;
    creationDate: Date;
    updateDate: Date;
    isDeleted: boolean;
    maxVolume: number;
    minVolume: number;
    numberOfDays: number;
    priorityId: string;
    serviceId: string;
    tatValue: number;
    validFrom: Date;
    validTo: Date;
    volumeBracket: number;
    priority: Priority;
    service: Service;
}

