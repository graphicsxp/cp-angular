import { EntityBase } from './entity-base';
import { ParameterTypeValue } from './parameter-type-value';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class ParameterType extends EntityBase {

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
    dataType: string;
    dotNetFullType: string;
    name: string;
    values: ParameterTypeValue[];
}

