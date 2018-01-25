import { EntityBase } from './entity-base';
import { WorkflowTask } from './workflow-task';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class WorkflowTaskContextualInfo extends EntityBase {

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
    clients: string;
    closestJobDeadline: Date;
    priorities: string;
    requestIDs: string;
    services: string;
    serviceCodes: string;
    shouldDisplayTask: boolean;
    sourceLanguages: string;
    targetLanguages: string;
    volumesAndUnits: string;
    workflowTasks: WorkflowTask[];
}

