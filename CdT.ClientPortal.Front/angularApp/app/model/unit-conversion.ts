import { EntityBase } from './entity-base';
import { Unit } from './unit';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class UnitConversion extends EntityBase {

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
    conversionFactor: number;
    description: string;
    roundingDecimals: number;
    sourceUnitId: string;
    targetUnitId: string;
    validFrom: Date;
    validTo: Date;
    sourceUnit: Unit;
    targetUnit: Unit;
}

