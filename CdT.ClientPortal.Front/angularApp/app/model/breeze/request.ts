import { EntityManagerService } from './../../entity-manager.service';
import { RequestService } from './../../requests/services/request.service';
import { EntityBase } from './entity-base';
import { Forecast } from './forecast';
import { RequestType } from './request-type';
import { RequestSubStatus } from './request-sub-status';
import { RequestTemplate } from './request-template';
import { ReferenceSet } from './reference-set';
import { RequestDeliveryContact } from './request-delivery-contact';
import { Comment } from './comment';
import { Justification } from './justification';
import { Client } from './client';
import { Contact } from './contact';
import { DeliveryMode } from './delivery-mode';
import { Department } from './department';
import { RequestContact } from './request-contact';
import { SourceMaterial } from './source-material';
import { Purpose } from './purpose';
import { Status } from './status';

/// <code-import> Place custom imports between <code-import> tags
import { DataType } from 'breeze-client';
import { Priority } from './priority';
import * as _ from 'lodash';
/// </code-import>

export class Request extends EntityBase {

  /// <code> Place custom code between <code> tags
  isScreenDeleted: boolean;
  priority: Priority;
  closestDeadline: Date;

  static requestPostInitializer(request: Request, entityManagerService: EntityManagerService) {
    if (request.id === DataType.Guid.defaultValue) {
      request.quotationOnly = false;
      request.isScreenDeleted = false;
      request.phoneCountryCode = '';
      request.phoneNumber = '';
      request.fromApplication = 'ClientPortal';
      request.isSecondAssessmentNeeded = false;
      request.forceSecondAssessment = false;
      request.shouldMergePostProcessing = false;
      request.areCommentsPublished = false;
      request.isCFCFlowLaunched = false;
      request.areCommentsPublished = false;
      request.blockAutomation = false;
      request.quotationOnly = false;
      request.lTSConfirmedVolume = false;
    } else {
      let priority: Priority = null;
      let service = '';
      let closestDeadline: Date = null;

      request.sourceMaterials.forEach(sourceMaterial => {
        if (sourceMaterial.jobs) {
          sourceMaterial.jobs.forEach(job => {
            if (job.priority && job.priority.displayOrder > (priority && priority.displayOrder || 0)) {
              priority = job.priority;
              service = job.service.code;
            }

            if ((!closestDeadline || job.deadline < closestDeadline) && job.jobStatus.code === 'INP') {
              closestDeadline = job.deadline;
            }
          });
        }
      });

      if (!closestDeadline) {
        closestDeadline = _.chain(request.sourceMaterials).map('jobs').flatten().map('deadline').min().value();
      }

      request.priority = priority;
      request.closestDeadline = closestDeadline;
    }
  }

  constructor() {
    super();
  }

  /// </code>

  // Generated code. Do not place code below this line.
  // tslint:disable:member-ordering
  id: string;
  version: number;
  createdBy: string;
  updatedBy: string;
  creationDate: Date;
  updateDate: Date;
  isDeleted: boolean;
  approvalDate: Date;
  assignedTo: string;
  clientComment: string;
  commentsForClient: string;
  clientId: string;
  clientReference: string;
  correlationId: string;
  deliveryDate: Date;
  deliveryModeId: string;
  departmentId: string;
  expiryDate: Date;
  fromApplication: string;
  isFirstAssessmentDone: boolean;
  isSecondAssessmentDone: boolean;
  isSecondAssessmentNeeded: boolean;
  forceSecondAssessment: boolean;
  isStatBlocked: boolean;
  areCommentsPublished: boolean;
  isCFCFlowLaunched: boolean;
  lastClientNotifiedRevision: number;
  lTSComment: string;
  lTSConfirmedVolume: boolean;
  phoneCountryCode: string;
  phoneNumber: string;
  purposeId: string;
  qualityCheckComment: string;
  quotationOnly: boolean;
  receiptDate: Date;
  referenceSetId: string;
  requestIdentifier: string;
  requestTemplateId: string;
  sentById: string;
  associatedForecastId: string;
  statusId: string;
  requestTypeId: string;
  requestSubStatusId: string;
  submissionDate: Date;
  title: string;
  translatorComment: string;
  quotationExpirationDate: Date;
  shouldMergePostProcessing: boolean;
  uniquePostProcessing: boolean;
  blockAutomation: boolean;
  blockAutomationJustificationId: string;
  pullBackTWAUserName: string;
  sendEmailForPullback: boolean;
  client: Client;
  comments: Comment[];
  deliveryMode: DeliveryMode;
  department: Department;
  purpose: Purpose;
  referenceSet: ReferenceSet;
  requestContacts: RequestContact[];
  requestDeliveryContacts: RequestDeliveryContact[];
  requestTemplate: RequestTemplate;
  sentBy: Contact;
  associatedForecast: Forecast;
  sourceMaterials: SourceMaterial[];
  status: Status;
  requestSubStatus: RequestSubStatus;
  requestType: RequestType;
  blockAutomationJustification: Justification;
}

