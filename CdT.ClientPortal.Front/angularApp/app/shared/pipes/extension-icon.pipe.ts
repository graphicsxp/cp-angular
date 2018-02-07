import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns an icon matching the extension code passed in input.
 */
@Pipe({
    name: 'extensionIcon'
})
export class ExtensionIconPipe implements PipeTransform {
    transform(extension): string {
        let icon: string;

        switch (extension) {
            case 'WO':
                icon = 'icon-cdt-word fa-2x';
                break;
            case 'DF':
                icon = 'icon-cdt-pdf fa-2x';
                break;
            case 'EX':
                icon = 'icon-cdt-excel fa-2x';
                break;
            case 'PT':
                icon = 'icon-cdt-powerpoint fa-2x';
                break;
            case 'XM':
                icon = 'icon-cdt-xml fa-2x';
                break;
            case 'HT':
                icon = 'icon-cdt-html fa-2x';
                break;
            case 'ID':
                icon = 'icon-cdt-indd fa-2x';
                break;
            case 'JG':
                icon = 'icon-cdt-jpg fa-2x';
                break;
            case 'PM':
                icon = 'icon-cdt-pagemaker fa-2x';
                break;
            case 'PU':
                icon = 'icon-cdt-publisher fa-2x';
                break;
            case 'TX':
                icon = 'icon-cdt-txt fa-2x';
                break;
            case 'WP':
                icon = 'icon-cdt-wordperfect fa-2x';
                break;
            case 'SD':
                icon = 'icon-cdt-sdl fa-2x';
                break;
            case 'PC':
                icon = 'icon-cdt-pac fa-2x';
                break;
            case 'SR':
                icon = 'icon-cdt-srt fa-2x';
                break;
            case 'W3':
                icon = 'icon-cdt-w32 fa-2x';
                break;
            case 'VT':
                icon = 'icon-cdt-vtt fa-2x';
                break;
            default:
                icon = 'icon-cdt-default fa-2x';
                break;
        }
        return `<i class="${icon}"></i>`
    }
}
