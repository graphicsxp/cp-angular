import { EntityBase } from './entity-base';
import { ParameterType } from './parameter-type';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class GlobalParameter extends EntityBase {

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
    codeParameter: string;
    description: string;
    isSystem: boolean;
    parameterTypeId: string;
    value: string;
    groupLabel: string;
    parameterType: ParameterType;
}

