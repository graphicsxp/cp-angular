import { MetadataStore } from 'breeze-client';

import { AssessmentEvalComment } from './assessment-eval-comment';
import { PostProPriorityDetails } from './post-pro-priority-details';
import { VPOSTPROCESSINGDASHBOARD } from './vpostprocessingdashboard';
import { ApplicationNewsFile } from './application-news-file';
import { ApplicationNews } from './application-news';
import { ApplicationUnavailability } from './application-unavailability';
import { AppScreenField } from './app-screen-field';
import { AppScreenFieldStatus } from './app-screen-field-status';
import { AssessmentComment } from './assessment-comment';
import { AssessmentStatus } from './assessment-status';
import { AssignmentUser } from './assignment-user';
import { Confidentiality } from './confidentiality';
import { LanguageGroupLanguage } from './language-group-language';
import { LanguageGroup } from './language-group';
import { AssessmentRRCReason } from './assessment-rrc-reason';
import { RrcMeeting } from './rrc-meeting';
import { SdlStudioAutoSuggestDictionary } from './sdl-studio-auto-suggest-dictionary';
import { SelfServiceParameter } from './self-service-parameter';
import { StickyNote } from './sticky-note';
import { EuroclassClassification } from './euroclass-classification';
import { GAContext } from './ga-context';
import { GAContextFreelancer } from './ga-context-freelancer';
import { SdlStudioProjectTemplate } from './sdl-studio-project-template';
import { EuroclassPretranslation } from './euroclass-pretranslation';
import { TramarkAssessment } from './tramark-assessment';
import { TramarkAssessmentError } from './tramark-assessment-error';
import { TramarkAssessmentErrorSummary } from './tramark-assessment-error-summary';
import { TranslatorTaskProgress } from './translator-task-progress';
import { TranslatorFriendlyName } from './translator-friendly-name';
import { FeedbackToFreelancer } from './feedback-to-freelancer';
import { Assessment } from './assessment';
import { AssessmentPDFData } from './assessment-pdf-data';
import { LanguageParameter } from './language-parameter';
import { Notification } from './notification';
import { NotificationRead } from './notification-read';
import { NotificationTemplate } from './notification-template';
import { ReferenceTeam } from './reference-team';
import { CustomerSatisfactionForm } from './customer-satisfaction-form';
import { Forecast } from './forecast';
import { ForecastSourceLanguage } from './forecast-source-language';
import { MessageBody } from './message-body';
import { TaskDefinitionParameter } from './task-definition-parameter';
import { TopicCategory } from './topic-category';
import { TopicMessageUser } from './topic-message-user';
import { TopicMessage } from './topic-message';
import { Topic } from './topic';
import { RequestType } from './request-type';
import { RequestSubStatus } from './request-sub-status';
import { RequestTemplateTargetLanguage } from './request-template-target-language';
import { ScopingInfo } from './scoping-info';
import { PreformattedFile } from './preformatted-file';
import { RequestTemplateDeliveryContact } from './request-template-delivery-contact';
import { RequestTemplateSourceLanguage } from './request-template-source-language';
import { RequestTemplateContact } from './request-template-contact';
import { RequestTemplate } from './request-template';
import { ParameterType } from './parameter-type';
import { GlobalParameter } from './global-parameter';
import { EmailTemplate } from './email-template';
import { JobDeliveredMaterial } from './job-delivered-material';
import { ParameterTypeValue } from './parameter-type-value';
import { ReferenceLanguage } from './reference-language';
import { Reference } from './reference';
import { ReferenceSet } from './reference-set';
import { RequestDeliveryContact } from './request-delivery-contact';
import { LtsGroup } from './lts-group';
import { SDLUsageRule } from './sdl-usage-rule';
import { ActivitySkippingRule } from './activity-skipping-rule';
import { Comment } from './comment';
import { Justification } from './justification';
import { ReceiptDate } from './receipt-date';
import { Holiday } from './holiday';
import { AddressBook } from './address-book';
import { Capability } from './capability';
import { ActivitySkippingRuleSet } from './activity-skipping-rule-set';
import { Assignee } from './assignee';
import { PhysicalFileVersion } from './physical-file-version';
import { JobStatus } from './job-status';
import { JobComment } from './job-comment';
import { ForecastTargetLanguage } from './forecast-target-language';
import { StatBlock } from './stat-block';
import { TopicSourceMaterial } from './topic-source-material';
import { UnblockRequest } from './unblock-request';
import { WorldServerTask } from './world-server-task';
import { TranslatorLanguage } from './translator-language';
import { TranslatorDomain } from './translator-domain';
import { TranslatorService } from './translator-service';
import { ClientCountry } from './client-country';
import { Client } from './client';
import { Contact } from './contact';
import { Country } from './country';
import { Currency } from './currency';
import { DeliveryMode } from './delivery-mode';
import { Department } from './department';
import { DocumentFormatExtension } from './document-format-extension';
import { DocumentFormat } from './document-format';
import { DocumentFormatTarget } from './document-format-target';
import { Domain } from './domain';
import { Job } from './job';
import { JobContact } from './job-contact';
import { JobRecipient } from './job-recipient';
import { JobMaterial } from './job-material';
import { Language } from './language';
import { RequestContact } from './request-contact';
import { Material } from './material';
import { MaterialClassification } from './material-classification';
import { SourceMaterial } from './source-material';
import { SourceMaterialLanguage } from './source-material-language';
import { PriorityMultiplier } from './priority-multiplier';
import { Priority } from './priority';
import { Purpose } from './purpose';
import { Recipient } from './recipient';
import { Request } from './request';
import { Section } from './section';
import { PriceList } from './price-list';
import { Service } from './service';
import { Specialisation } from './specialisation';
import { Status } from './status';
import { Team } from './team';
import { TurnaroundTime } from './turnaround-time';
import { UnitConversion } from './unit-conversion';
import { Unit } from './unit';
import { UnitType } from './unit-type';
import { BusinessRuleLogEntry } from './business-rule-log-entry';
import { DecisionTreeActionNode } from './decision-tree-action-node';
import { DecisionTreeResultNode } from './decision-tree-result-node';
import { DecisionTreeQueryNode } from './decision-tree-query-node';
import { DecisionTree } from './decision-tree';
import { BusinessRuleSet } from './business-rule-set';
import { BusinessRule } from './business-rule';
import { CrossCheckInfo } from './cross-check-info';
import { CommentIO } from './comment-io';
import { NetworkSharedFileLocation } from './network-shared-file-location';
import { WorkflowActivityDuration } from './workflow-activity-duration';
import { WorkflowTaskExecutionMonitoring } from './workflow-task-execution-monitoring';
import { TermDatabaseGroup } from './term-database-group';
import { TranslationMemoryGroup } from './translation-memory-group';
import { WorkflowEngineExecutionCycle } from './workflow-engine-execution-cycle';
import { WorkflowStepExecutionCycle } from './workflow-step-execution-cycle';
import { WorkflowInstanceExecutionCycle } from './workflow-instance-execution-cycle';
import { WorkflowTaskExecutionCycle } from './workflow-task-execution-cycle';
import { TermDatabase } from './term-database';
import { NegotiatedProcedureAssignee } from './negotiated-procedure-assignee';
import { DocumentIOMatClassif } from './document-io-mat-classif';
import { IOSetDocumentIO } from './io-set-document-io';
import { IOSet } from './io-set';
import { DocumentIO } from './document-io';
import { SpecificContract } from './specific-contract';
import { TranslationMemory } from './translation-memory';
import { WorldServerInput } from './world-server-input';
import { WorkflowTaskContextualInfo } from './workflow-task-contextual-info';
import { OrderFormPdfDataJobRow } from './order-form-pdf-data-job-row';
import { OrderFormData } from './order-form-data';
import { OrderFormPdfData } from './order-form-pdf-data';
import { JobSpecificTaskPropertySet } from './job-specific-task-property-set';
import { ActivityDefinition } from './activity-definition';
import { WorkflowEvent } from './workflow-event';
import { WorkflowBranchDimension } from './workflow-branch-dimension';
import { WorkflowBranch } from './workflow-branch';
import { WorkflowBranchContextWorkflowBranch } from './workflow-branch-context-workflow-branch';
import { WorkflowInstanceJob } from './workflow-instance-job';
import { TaskPropertySet } from './task-property-set';
import { PredefWorkflowTaskPropertySet } from './predef-workflow-task-property-set';
import { WorkflowBranchContext } from './workflow-branch-context';
import { WorkflowTask } from './workflow-task';
import { JobJobGroup } from './job-job-group';
import { JobGroup } from './job-group';
import { TaskDefinition } from './task-definition';
import { TransitionRule } from './transition-rule';
import { WorkflowInstance } from './workflow-instance';
import { WorkflowSkipStep } from './workflow-skip-step';
import { WorkflowStep } from './workflow-step';
import { WorkflowStepDefinition } from './workflow-step-definition';
import { WorkflowDefinition } from './workflow-definition';
import { WorkflowTaskReport } from './workflow-task-report';
import { WorkflowTaskMonitoring } from './workflow-task-monitoring';
import { ActivityReport } from './activity-report';
import { RunningWorkflow } from './running-workflow';
import { JobTramarkAssessment } from './job-tramark-assessment';
import { JobEuroclass } from './job-euroclass';
import { AlertNotification } from './alert-notification';
import { JobMisc } from './job-misc';
import { ForumNotification } from './forum-notification';
import { JobTramark } from './job-tramark';
import { TaskNotification } from './task-notification';
import { JobSubtitling } from './job-subtitling';
import { AssigneeRole } from './assignee-role';
import { ExternalResource } from './external-resource';
import { AssigneeExt } from './assignee-ext';
import { Translator } from './translator';
import { JobTranslation } from './job-translation';
import { JobTermListRevision } from './job-term-list-revision';
import { JobTermList } from './job-term-list';
import { JobTerminology } from './job-terminology';
import { JobRevision } from './job-revision';
import { JobModification } from './job-modification';
import { JobEditing } from './job-editing';
import { PhysicalFile } from './physical-file';
import { NetworkSharedFile } from './network-shared-file';
import { Url } from './url';
import { AssessmentTaskPropertySet } from './assessment-task-property-set';
import { FeedbackTaskPropertySet } from './feedback-task-property-set';
import { EuroclassTaskPropertySet } from './euroclass-task-property-set';
import { TramarkAssessmentTaskPropertySet } from './tramark-assessment-task-property-set';
import { EventHandlerTaskPropertySet } from './event-handler-task-property-set';
import { DeliveryTaskPropertySet } from './delivery-task-property-set';
import { FinalizePDWTPTaskPropertySet } from './finalize-pdwtp-task-property-set';
import { QualityControlTaskPropertySet } from './quality-control-task-property-set';
import { PostProcessingTaskPropertySet } from './post-processing-task-property-set';
import { MidProcessingTaskPropertySet } from './mid-processing-task-property-set';
import { PreProcessingTaskPropertySet } from './pre-processing-task-property-set';
import { TranslationTaskPropertySet } from './translation-task-property-set';

export class RegistrationHelper {

    static register(metadataStore: MetadataStore) {
        metadataStore.registerEntityTypeCtor('AssessmentEvalComment', AssessmentEvalComment);
        metadataStore.registerEntityTypeCtor('PostProPriorityDetails', PostProPriorityDetails);
        metadataStore.registerEntityTypeCtor('VPOSTPROCESSINGDASHBOARD', VPOSTPROCESSINGDASHBOARD);
        metadataStore.registerEntityTypeCtor('ApplicationNewsFile', ApplicationNewsFile);
        metadataStore.registerEntityTypeCtor('ApplicationNews', ApplicationNews);
        metadataStore.registerEntityTypeCtor('ApplicationUnavailability', ApplicationUnavailability);
        metadataStore.registerEntityTypeCtor('AppScreenField', AppScreenField);
        metadataStore.registerEntityTypeCtor('AppScreenFieldStatus', AppScreenFieldStatus);
        metadataStore.registerEntityTypeCtor('AssessmentComment', AssessmentComment);
        metadataStore.registerEntityTypeCtor('AssessmentStatus', AssessmentStatus);
        metadataStore.registerEntityTypeCtor('AssignmentUser', AssignmentUser);
        metadataStore.registerEntityTypeCtor('Confidentiality', Confidentiality);
        metadataStore.registerEntityTypeCtor('LanguageGroupLanguage', LanguageGroupLanguage);
        metadataStore.registerEntityTypeCtor('LanguageGroup', LanguageGroup);
        metadataStore.registerEntityTypeCtor('AssessmentRRCReason', AssessmentRRCReason);
        metadataStore.registerEntityTypeCtor('RrcMeeting', RrcMeeting);
        metadataStore.registerEntityTypeCtor('SdlStudioAutoSuggestDictionary', SdlStudioAutoSuggestDictionary);
        metadataStore.registerEntityTypeCtor('SelfServiceParameter', SelfServiceParameter);
        metadataStore.registerEntityTypeCtor('StickyNote', StickyNote);
        metadataStore.registerEntityTypeCtor('EuroclassClassification', EuroclassClassification);
        metadataStore.registerEntityTypeCtor('GAContext', GAContext);
        metadataStore.registerEntityTypeCtor('GAContextFreelancer', GAContextFreelancer);
        metadataStore.registerEntityTypeCtor('SdlStudioProjectTemplate', SdlStudioProjectTemplate);
        metadataStore.registerEntityTypeCtor('EuroclassPretranslation', EuroclassPretranslation);
        metadataStore.registerEntityTypeCtor('TramarkAssessment', TramarkAssessment);
        metadataStore.registerEntityTypeCtor('TramarkAssessmentError', TramarkAssessmentError);
        metadataStore.registerEntityTypeCtor('TramarkAssessmentErrorSummary', TramarkAssessmentErrorSummary);
        metadataStore.registerEntityTypeCtor('TranslatorTaskProgress', TranslatorTaskProgress);
        metadataStore.registerEntityTypeCtor('TranslatorFriendlyName', TranslatorFriendlyName);
        metadataStore.registerEntityTypeCtor('FeedbackToFreelancer', FeedbackToFreelancer);
        metadataStore.registerEntityTypeCtor('Assessment', Assessment);
        metadataStore.registerEntityTypeCtor('AssessmentPDFData', AssessmentPDFData);
        metadataStore.registerEntityTypeCtor('LanguageParameter', LanguageParameter);
        metadataStore.registerEntityTypeCtor('Notification', Notification);
        metadataStore.registerEntityTypeCtor('NotificationRead', NotificationRead);
        metadataStore.registerEntityTypeCtor('NotificationTemplate', NotificationTemplate);
        metadataStore.registerEntityTypeCtor('ReferenceTeam', ReferenceTeam);
        metadataStore.registerEntityTypeCtor('CustomerSatisfactionForm', CustomerSatisfactionForm);
        metadataStore.registerEntityTypeCtor('Forecast', Forecast);
        metadataStore.registerEntityTypeCtor('ForecastSourceLanguage', ForecastSourceLanguage);
        metadataStore.registerEntityTypeCtor('MessageBody', MessageBody);
        metadataStore.registerEntityTypeCtor('TaskDefinitionParameter', TaskDefinitionParameter);
        metadataStore.registerEntityTypeCtor('TopicCategory', TopicCategory);
        metadataStore.registerEntityTypeCtor('TopicMessageUser', TopicMessageUser);
        metadataStore.registerEntityTypeCtor('TopicMessage', TopicMessage);
        metadataStore.registerEntityTypeCtor('Topic', Topic);
        metadataStore.registerEntityTypeCtor('RequestType', RequestType);
        metadataStore.registerEntityTypeCtor('RequestSubStatus', RequestSubStatus);
        metadataStore.registerEntityTypeCtor('RequestTemplateTargetLanguage', RequestTemplateTargetLanguage);
        metadataStore.registerEntityTypeCtor('ScopingInfo', ScopingInfo);
        metadataStore.registerEntityTypeCtor('PreformattedFile', PreformattedFile);
        metadataStore.registerEntityTypeCtor('RequestTemplateDeliveryContact', RequestTemplateDeliveryContact);
        metadataStore.registerEntityTypeCtor('RequestTemplateSourceLanguage', RequestTemplateSourceLanguage);
        metadataStore.registerEntityTypeCtor('RequestTemplateContact', RequestTemplateContact);
        metadataStore.registerEntityTypeCtor('RequestTemplate', RequestTemplate);
        metadataStore.registerEntityTypeCtor('ParameterType', ParameterType);
        metadataStore.registerEntityTypeCtor('GlobalParameter', GlobalParameter);
        metadataStore.registerEntityTypeCtor('EmailTemplate', EmailTemplate);
        metadataStore.registerEntityTypeCtor('JobDeliveredMaterial', JobDeliveredMaterial);
        metadataStore.registerEntityTypeCtor('ParameterTypeValue', ParameterTypeValue);
        metadataStore.registerEntityTypeCtor('ReferenceLanguage', ReferenceLanguage);
        metadataStore.registerEntityTypeCtor('Reference', Reference);
        metadataStore.registerEntityTypeCtor('ReferenceSet', ReferenceSet);
        metadataStore.registerEntityTypeCtor('RequestDeliveryContact', RequestDeliveryContact);
        metadataStore.registerEntityTypeCtor('LtsGroup', LtsGroup);
        metadataStore.registerEntityTypeCtor('SDLUsageRule', SDLUsageRule);
        metadataStore.registerEntityTypeCtor('ActivitySkippingRule', ActivitySkippingRule);
        metadataStore.registerEntityTypeCtor('Comment', Comment);
        metadataStore.registerEntityTypeCtor('Justification', Justification);
        metadataStore.registerEntityTypeCtor('ReceiptDate', ReceiptDate);
        metadataStore.registerEntityTypeCtor('Holiday', Holiday);
        metadataStore.registerEntityTypeCtor('AddressBook', AddressBook);
        metadataStore.registerEntityTypeCtor('Capability', Capability);
        metadataStore.registerEntityTypeCtor('ActivitySkippingRuleSet', ActivitySkippingRuleSet);
        metadataStore.registerEntityTypeCtor('Assignee', Assignee);
        metadataStore.registerEntityTypeCtor('PhysicalFileVersion', PhysicalFileVersion);
        metadataStore.registerEntityTypeCtor('JobStatus', JobStatus);
        metadataStore.registerEntityTypeCtor('JobComment', JobComment);
        metadataStore.registerEntityTypeCtor('ForecastTargetLanguage', ForecastTargetLanguage);
        metadataStore.registerEntityTypeCtor('StatBlock', StatBlock);
        metadataStore.registerEntityTypeCtor('TopicSourceMaterial', TopicSourceMaterial);
        metadataStore.registerEntityTypeCtor('UnblockRequest', UnblockRequest);
        metadataStore.registerEntityTypeCtor('WorldServerTask', WorldServerTask);
        metadataStore.registerEntityTypeCtor('TranslatorLanguage', TranslatorLanguage);
        metadataStore.registerEntityTypeCtor('TranslatorDomain', TranslatorDomain);
        metadataStore.registerEntityTypeCtor('TranslatorService', TranslatorService);
        metadataStore.registerEntityTypeCtor('ClientCountry', ClientCountry);
        metadataStore.registerEntityTypeCtor('Client', Client);
        metadataStore.registerEntityTypeCtor('Contact', Contact);
        metadataStore.registerEntityTypeCtor('Country', Country);
        metadataStore.registerEntityTypeCtor('Currency', Currency);
        metadataStore.registerEntityTypeCtor('DeliveryMode', DeliveryMode);
        metadataStore.registerEntityTypeCtor('Department', Department);
        metadataStore.registerEntityTypeCtor('DocumentFormatExtension', DocumentFormatExtension);
        metadataStore.registerEntityTypeCtor('DocumentFormat', DocumentFormat);
        metadataStore.registerEntityTypeCtor('DocumentFormatTarget', DocumentFormatTarget);
        metadataStore.registerEntityTypeCtor('Domain', Domain);
        metadataStore.registerEntityTypeCtor('Job', Job);
        metadataStore.registerEntityTypeCtor('JobContact', JobContact);
        metadataStore.registerEntityTypeCtor('JobRecipient', JobRecipient);
        metadataStore.registerEntityTypeCtor('JobMaterial', JobMaterial);
        metadataStore.registerEntityTypeCtor('Language', Language);
        metadataStore.registerEntityTypeCtor('RequestContact', RequestContact);
        metadataStore.registerEntityTypeCtor('Material', Material);
        metadataStore.registerEntityTypeCtor('MaterialClassification', MaterialClassification);
        metadataStore.registerEntityTypeCtor('SourceMaterial', SourceMaterial, SourceMaterial.sourceMaterialPostInitializer);
        metadataStore.registerEntityTypeCtor('SourceMaterialLanguage', SourceMaterialLanguage);
        metadataStore.registerEntityTypeCtor('PriorityMultiplier', PriorityMultiplier);
        metadataStore.registerEntityTypeCtor('Priority', Priority);
        metadataStore.registerEntityTypeCtor('Purpose', Purpose);
        metadataStore.registerEntityTypeCtor('Recipient', Recipient);
        metadataStore.registerEntityTypeCtor('Request', Request, Request.requestPostInitializer);
        metadataStore.registerEntityTypeCtor('Section', Section);
        metadataStore.registerEntityTypeCtor('PriceList', PriceList);
        metadataStore.registerEntityTypeCtor('Service', Service);
        metadataStore.registerEntityTypeCtor('Specialisation', Specialisation);
        metadataStore.registerEntityTypeCtor('Status', Status);
        metadataStore.registerEntityTypeCtor('Team', Team);
        metadataStore.registerEntityTypeCtor('TurnaroundTime', TurnaroundTime);
        metadataStore.registerEntityTypeCtor('UnitConversion', UnitConversion);
        metadataStore.registerEntityTypeCtor('Unit', Unit);
        metadataStore.registerEntityTypeCtor('UnitType', UnitType);
        metadataStore.registerEntityTypeCtor('BusinessRuleLogEntry', BusinessRuleLogEntry);
        metadataStore.registerEntityTypeCtor('DecisionTreeActionNode', DecisionTreeActionNode);
        metadataStore.registerEntityTypeCtor('DecisionTreeResultNode', DecisionTreeResultNode);
        metadataStore.registerEntityTypeCtor('DecisionTreeQueryNode', DecisionTreeQueryNode);
        metadataStore.registerEntityTypeCtor('DecisionTree', DecisionTree);
        metadataStore.registerEntityTypeCtor('BusinessRuleSet', BusinessRuleSet);
        metadataStore.registerEntityTypeCtor('BusinessRule', BusinessRule);
        metadataStore.registerEntityTypeCtor('CrossCheckInfo', CrossCheckInfo);
        metadataStore.registerEntityTypeCtor('CommentIO', CommentIO);
        metadataStore.registerEntityTypeCtor('NetworkSharedFileLocation', NetworkSharedFileLocation);
        metadataStore.registerEntityTypeCtor('WorkflowActivityDuration', WorkflowActivityDuration);
        metadataStore.registerEntityTypeCtor('WorkflowTaskExecutionMonitoring', WorkflowTaskExecutionMonitoring);
        metadataStore.registerEntityTypeCtor('TermDatabaseGroup', TermDatabaseGroup);
        metadataStore.registerEntityTypeCtor('TranslationMemoryGroup', TranslationMemoryGroup);
        metadataStore.registerEntityTypeCtor('WorkflowEngineExecutionCycle', WorkflowEngineExecutionCycle);
        metadataStore.registerEntityTypeCtor('WorkflowStepExecutionCycle', WorkflowStepExecutionCycle);
        metadataStore.registerEntityTypeCtor('WorkflowInstanceExecutionCycle', WorkflowInstanceExecutionCycle);
        metadataStore.registerEntityTypeCtor('WorkflowTaskExecutionCycle', WorkflowTaskExecutionCycle);
        metadataStore.registerEntityTypeCtor('TermDatabase', TermDatabase);
        metadataStore.registerEntityTypeCtor('NegotiatedProcedureAssignee', NegotiatedProcedureAssignee);
        metadataStore.registerEntityTypeCtor('DocumentIOMatClassif', DocumentIOMatClassif);
        metadataStore.registerEntityTypeCtor('IOSetDocumentIO', IOSetDocumentIO);
        metadataStore.registerEntityTypeCtor('IOSet', IOSet);
        metadataStore.registerEntityTypeCtor('DocumentIO', DocumentIO);
        metadataStore.registerEntityTypeCtor('SpecificContract', SpecificContract);
        metadataStore.registerEntityTypeCtor('TranslationMemory', TranslationMemory);
        metadataStore.registerEntityTypeCtor('WorldServerInput', WorldServerInput);
        metadataStore.registerEntityTypeCtor('WorkflowTaskContextualInfo', WorkflowTaskContextualInfo);
        metadataStore.registerEntityTypeCtor('OrderFormPdfDataJobRow', OrderFormPdfDataJobRow);
        metadataStore.registerEntityTypeCtor('OrderFormData', OrderFormData);
        metadataStore.registerEntityTypeCtor('OrderFormPdfData', OrderFormPdfData);
        metadataStore.registerEntityTypeCtor('JobSpecificTaskPropertySet', JobSpecificTaskPropertySet);
        metadataStore.registerEntityTypeCtor('ActivityDefinition', ActivityDefinition);
        metadataStore.registerEntityTypeCtor('WorkflowEvent', WorkflowEvent);
        metadataStore.registerEntityTypeCtor('WorkflowBranchDimension', WorkflowBranchDimension);
        metadataStore.registerEntityTypeCtor('WorkflowBranch', WorkflowBranch);
        metadataStore.registerEntityTypeCtor('WorkflowBranchContextWorkflowBranch', WorkflowBranchContextWorkflowBranch);
        metadataStore.registerEntityTypeCtor('WorkflowInstanceJob', WorkflowInstanceJob);
        metadataStore.registerEntityTypeCtor('TaskPropertySet', TaskPropertySet);
        metadataStore.registerEntityTypeCtor('PredefWorkflowTaskPropertySet', PredefWorkflowTaskPropertySet);
        metadataStore.registerEntityTypeCtor('WorkflowBranchContext', WorkflowBranchContext);
        metadataStore.registerEntityTypeCtor('WorkflowTask', WorkflowTask);
        metadataStore.registerEntityTypeCtor('JobJobGroup', JobJobGroup);
        metadataStore.registerEntityTypeCtor('JobGroup', JobGroup);
        metadataStore.registerEntityTypeCtor('TaskDefinition', TaskDefinition);
        metadataStore.registerEntityTypeCtor('TransitionRule', TransitionRule);
        metadataStore.registerEntityTypeCtor('WorkflowInstance', WorkflowInstance);
        metadataStore.registerEntityTypeCtor('WorkflowSkipStep', WorkflowSkipStep);
        metadataStore.registerEntityTypeCtor('WorkflowStep', WorkflowStep);
        metadataStore.registerEntityTypeCtor('WorkflowStepDefinition', WorkflowStepDefinition);
        metadataStore.registerEntityTypeCtor('WorkflowDefinition', WorkflowDefinition);
        metadataStore.registerEntityTypeCtor('WorkflowTaskReport', WorkflowTaskReport);
        metadataStore.registerEntityTypeCtor('WorkflowTaskMonitoring', WorkflowTaskMonitoring);
        metadataStore.registerEntityTypeCtor('ActivityReport', ActivityReport);
        metadataStore.registerEntityTypeCtor('RunningWorkflow', RunningWorkflow);
        metadataStore.registerEntityTypeCtor('JobTramarkAssessment', JobTramarkAssessment);
        metadataStore.registerEntityTypeCtor('JobEuroclass', JobEuroclass);
        metadataStore.registerEntityTypeCtor('AlertNotification', AlertNotification);
        metadataStore.registerEntityTypeCtor('JobMisc', JobMisc);
        metadataStore.registerEntityTypeCtor('ForumNotification', ForumNotification);
        metadataStore.registerEntityTypeCtor('JobTramark', JobTramark);
        metadataStore.registerEntityTypeCtor('TaskNotification', TaskNotification);
        metadataStore.registerEntityTypeCtor('JobSubtitling', JobSubtitling);
        metadataStore.registerEntityTypeCtor('AssigneeRole', AssigneeRole);
        metadataStore.registerEntityTypeCtor('ExternalResource', ExternalResource);
        metadataStore.registerEntityTypeCtor('AssigneeExt', AssigneeExt);
        metadataStore.registerEntityTypeCtor('Translator', Translator);
        metadataStore.registerEntityTypeCtor('JobTranslation', JobTranslation);
        metadataStore.registerEntityTypeCtor('JobTermListRevision', JobTermListRevision);
        metadataStore.registerEntityTypeCtor('JobTermList', JobTermList);
        metadataStore.registerEntityTypeCtor('JobTerminology', JobTerminology);
        metadataStore.registerEntityTypeCtor('JobRevision', JobRevision);
        metadataStore.registerEntityTypeCtor('JobModification', JobModification);
        metadataStore.registerEntityTypeCtor('JobEditing', JobEditing);
        metadataStore.registerEntityTypeCtor('PhysicalFile', PhysicalFile, PhysicalFile.physicalFilePostInitializer);
        metadataStore.registerEntityTypeCtor('NetworkSharedFile', NetworkSharedFile);
        metadataStore.registerEntityTypeCtor('Url', Url);
        metadataStore.registerEntityTypeCtor('AssessmentTaskPropertySet', AssessmentTaskPropertySet);
        metadataStore.registerEntityTypeCtor('FeedbackTaskPropertySet', FeedbackTaskPropertySet);
        metadataStore.registerEntityTypeCtor('EuroclassTaskPropertySet', EuroclassTaskPropertySet);
        metadataStore.registerEntityTypeCtor('TramarkAssessmentTaskPropertySet', TramarkAssessmentTaskPropertySet);
        metadataStore.registerEntityTypeCtor('EventHandlerTaskPropertySet', EventHandlerTaskPropertySet);
        metadataStore.registerEntityTypeCtor('DeliveryTaskPropertySet', DeliveryTaskPropertySet);
        metadataStore.registerEntityTypeCtor('FinalizePDWTPTaskPropertySet', FinalizePDWTPTaskPropertySet);
        metadataStore.registerEntityTypeCtor('QualityControlTaskPropertySet', QualityControlTaskPropertySet);
        metadataStore.registerEntityTypeCtor('PostProcessingTaskPropertySet', PostProcessingTaskPropertySet);
        metadataStore.registerEntityTypeCtor('MidProcessingTaskPropertySet', MidProcessingTaskPropertySet);
        metadataStore.registerEntityTypeCtor('PreProcessingTaskPropertySet', PreProcessingTaskPropertySet);
        metadataStore.registerEntityTypeCtor('TranslationTaskPropertySet', TranslationTaskPropertySet);
    }
}
