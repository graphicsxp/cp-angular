import { EntityBase } from './entity-base';
import { ScopingInfo } from './scoping-info';
import { PreformattedFile } from './preformatted-file';
import { Job } from './job';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorldServerTask extends EntityBase {

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
    jobId: string;
    preformattedFileId: string;
    scopingInfoId: string;
    worldServerPathFrom: string;
    worldServerPathTo: string;
    worldServerTaskId: number;
    isIncrementalModification: boolean;
    job: Job;
    preformattedFile: PreformattedFile;
    scopingInfo: ScopingInfo;
}

