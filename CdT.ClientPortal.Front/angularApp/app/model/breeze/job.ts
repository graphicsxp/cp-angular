import { EntityBase } from './entity-base';
import { Assessment } from './assessment';
import { CustomerSatisfactionForm } from './customer-satisfaction-form';
import { ScopingInfo } from './scoping-info';
import { JobDeliveredMaterial } from './job-delivered-material';
import { Justification } from './justification';
import { JobStatus } from './job-status';
import { JobComment } from './job-comment';
import { WorldServerTask } from './world-server-task';
import { JobContact } from './job-contact';
import { JobMaterial } from './job-material';
import { Language } from './language';
import { SourceMaterial } from './source-material';
import { Priority } from './priority';
import { Service } from './service';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Job extends EntityBase {

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
    clientVolume: number;
    deadline: Date;
    deadlineUpdateJustificationId: string;
    jobStatusId: string;
    lTSVolume: number;
    priorityId: string;
    projectGroupId: number;
    projectId: number;
    scopingInfoId: string;
    serviceId: string;
    sourceLanguageId: string;
    sourceMaterialId: string;
    targetLanguageId: string;
    volume: number;
    worldServerSourceAssetPath: string;
    worldServerTargetAssetPath: string;
    worldServerVolume: number;
    isPreprocessingTaskComplete: boolean;
    deleteDate: Date;
    applyPricingPolicy: boolean;
    assessmentId: string;
    deliveryDate: Date;
    isDelivered: boolean;
    approvedDeadline: Date;
    deadlineUpdateJustification: Justification;
    jobComments: JobComment[];
    customerSatisfactionForms: CustomerSatisfactionForm[];
    jobContacts: JobContact[];
    jobDeliveredMaterials: JobDeliveredMaterial[];
    jobMaterials: JobMaterial[];
    jobStatus: JobStatus;
    priority: Priority;
    scopingInfo: ScopingInfo;
    service: Service;
    sourceLanguage: Language;
    sourceMaterial: SourceMaterial;
    targetLanguage: Language;
    worldServerTasks: WorldServerTask[];
    assessment: Assessment;
}

