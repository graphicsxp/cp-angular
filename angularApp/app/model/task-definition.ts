import { EntityBase } from './entity-base';
import { TaskDefinitionParameter } from './task-definition-parameter';
import { IOSet } from './io-set';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class TaskDefinition extends EntityBase {

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
    description: string;
    code: string;
    defaultLabel: string;
    executionMode: string;
    inputIOSetId: string;
    outputIOSetId: string;
    taskType: string;
    taskDefinitionParameterId: string;
    maxExecutionTime: number;
    inputIOSet: IOSet;
    outputIOSet: IOSet;
    taskDefinitionParameter: TaskDefinitionParameter;
}

