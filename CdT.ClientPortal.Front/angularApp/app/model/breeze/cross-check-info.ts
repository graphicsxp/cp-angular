import { EntityBase } from './entity-base';
import { WorkflowTask } from './workflow-task';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class CrossCheckInfo extends EntityBase {

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
    crossCheckDeliveryDate: Date;
    crossCheckDueDate: Date;
    crossCheckerId: number;
    crossCheckRequestDate: Date;
    crossCheckRequestorId: number;
    crossCheckSelfServiceDate: Date;
    taskId: string;
    task: WorkflowTask;
}

