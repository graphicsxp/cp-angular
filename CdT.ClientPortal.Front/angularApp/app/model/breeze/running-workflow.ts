import { EntityBase } from './entity-base';
import { Request } from './request';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class RunningWorkflow extends EntityBase {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    id: string;
    clientAbbreviation: string;
    deliveryActivityInfo: string;
    deliveryCompletedBranches: number;
    deliveryEarliestDeadline: Date;
    deliveryIsDelayed: number;
    deliveryRunningBranches: number;
    deliveryTotalBranches: number;
    deliveryWorkflowStepDefinitionId: string;
    isFirstAssessmentDone: boolean;
    midProcessingActivityInfo: string;
    midProcessingCompletedBranches: number;
    midProcessingEarliestDeadline: Date;
    midProcessingIsDelayed: number;
    midProcessingRunningBranches: number;
    midProcessingTotalBranches: number;
    midProcessingWorkflowStepDefinitionId: string;
    numberOfInternalBranches: number;
    postProcessingActivityInfo: string;
    postProcessingCompletedBranches: number;
    postProcessingEarliestDeadline: Date;
    postProcessingIsDelayed: number;
    postProcessingRunningBranches: number;
    postProcessingTotalBranches: number;
    postProcessingWorkflowStepDefinitionId: string;
    preProcessingActivityInfo: string;
    preProcessingCompletedBranches: number;
    preProcessingEarliestDeadline: Date;
    preProcessingIsDelayed: number;
    preProcessingRunningBranches: number;
    preProcessingTotalBranches: number;
    qualityControlActivityInfo: string;
    qualityControlCompletedBranches: number;
    qualityControlEarliestDeadline: Date;
    qualityControlIsDelayed: number;
    qualityControlRunningBranches: number;
    qualityControlTotalBranches: number;
    qualityControlWorkflowStepDefinitionId: string;
    requestAssignedTo: string;
    requestId: string;
    requestIdentifier: string;
    serviceActivityInfo: string;
    serviceCode: string;
    serviceCompletedBranches: number;
    serviceEarliestDeadline: Date;
    serviceIsDelayed: number;
    serviceRunningBranches: number;
    serviceTotalBranches: number;
    serviceWorkflowStepDefinitionId: string;
    userComments: string;
    request: Request;
}

