import { EntityBase } from './entity-base';
import { WorldServerTask } from './world-server-task';
import { Job } from './job';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ScopingInfo extends EntityBase {

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
    volumeA: number;
    volumeB: number;
    volumeC: number;
    repetition: number;
    totalVolume: number;
    exactMatch: number;
    iCEMatch: number;
    repetitionBilled: number;
    totalVolumeBilled: number;
    volumeABilled: number;
    volumeBBilled: number;
    volumeCBilled: number;
    totalClientVolumeBilled: number;
    jobs: Job[];
    worldServerTasks: WorldServerTask[];
}

