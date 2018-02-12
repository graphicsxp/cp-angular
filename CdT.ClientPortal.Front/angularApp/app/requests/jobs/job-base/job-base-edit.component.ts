import { EntityState } from 'breeze-client';
import { Job } from './../../../model/breeze/job';
import { EntityManagerService } from './../../../entity-manager.service';
import { Service } from './../../../model/breeze/service';
import { Priority } from './../../../model/breeze/priority';
import { SourceMaterial } from './../../../model/breeze/source-material';
import { Component, OnInit, Input } from '@angular/core';
import { JobBaseComponent } from './job-base.component';

/**
 *  Base component for displaying and managing the jobs of a given SourceMaterial
*/
export abstract class JobBaseEditComponent extends JobBaseComponent implements OnInit {

    @Input() sourceMaterial: SourceMaterial;
    @Input() priority: Priority;
    @Input() service: Service;

    constructor(protected _entityManagerService: EntityManagerService) { super(_entityManagerService); }

    ngOnInit() {
    }

    /**
     * whenever the volume is changed we apply rouding transformations
     * @param job the current job
     */
    onVolumeChanged(job: Job) {
        switch (this.service.code) {
            case 'ED':
                job.convertedVolume = this._roundPages(job.convertedVolume);
                job.clientVolume = this._roundPagesToCharacter(job.convertedVolume);
                break;
            case 'MO':
                job.convertedVolume = this._roundPages(job.convertedVolume);
                job.clientVolume = this._roundPagesToCharacter(job.convertedVolume);
                break;
            case 'RE':
                job.convertedVolume = this._roundPages(job.convertedVolume);
                job.clientVolume = this._roundPagesToCharacter(job.convertedVolume);
                break;
            case 'TE':
                job.convertedVolume = this._calculateManDays(job);
                job.clientVolume = job.convertedVolume;
                break;
            case 'RL':
                job.clientVolume = job.convertedVolume > 0 ? Math.round(job.convertedVolume) : null;
                break;
            case 'TL':
                job.clientVolume = job.convertedVolume > 0 ? Math.round(job.convertedVolume) : null;
                break;
            case 'ST':
                job.clientVolume = job.convertedVolume > 0 ? Math.round(job.convertedVolume) : null;
                break;
            case 'TR':
                job.convertedVolume = this._roundPages(job.convertedVolume);
                job.clientVolume = this._roundPagesToCharacter(job.convertedVolume);
                break;
        }
    }

    toggleDelete(job: Job) {
        if (job.entityAspect.entityState === EntityState.Added) {
            this._entityManagerService.deleteEntities([job], ['jobMaterials']);
        } else {
            job.isMarkedForDeletion = !job.isMarkedForDeletion;
            // needed for unmapped property
            job.entityAspect.setModified();
        }

        if (job.isMarkedForDeletion && (!job.convertedVolume || job.convertedVolume === 0)) {
            job.clientVolume = 1;
        }
    }

    private _roundPages(volume: number): number {
        // rounds a decimal volume to the next upper .5
        // 5.4 -> 5.5
        // 5.6 -> 6
        // 6.1 -> 6.5

        return Math.ceil(volume * 2) / 2;
    }

    private _roundPagesToCharacter(volume: number): number {
        if (volume < 0.5) {
            return null;
        } else {
            return volume * 1500;
        }
    }

    private _calculateManDays(job: Job): number {
        if (!job.days) { job.days = 0; }
        job.days = Math.floor(job.days);
        if (!job.hours) { job.hours = 0; }
        job.hours = Math.floor(job.hours);

        return job.days + job.hours / 8;
    }
}
