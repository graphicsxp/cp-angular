import { EntityBase } from './entity-base';
import { ForecastSourceLanguage } from './forecast-source-language';
import { ForecastTargetLanguage } from './forecast-target-language';
import { Client } from './client';
import { DocumentFormat } from './document-format';
import { Request } from './request';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class Forecast extends EntityBase {

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
    forecastNumber: number;
    requestDate: Date;
    requestId: string;
    clientId: string;
    documentFormatId: string;
    quantity: number;
    title: string;
    request: Request;
    client: Client;
    documentFormat: DocumentFormat;
    sourceLanguages: ForecastSourceLanguage[];
    targetLanguages: ForecastTargetLanguage[];
}

