import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns an icon matching the extension code passed in input. Code is case sensitive.
 */
@Pipe({
    name: 'extensionIcon'
})
export class ExtensionIconPipe implements PipeTransform {
    transform(extension): string {
        let icon: string;

        switch (extension) {
            case 'WO':
                icon = 'icon-cdt-word';
                break;
            case 'DF':
                icon = 'icon-cdt-pdf';
                break;
            case 'EX':
                icon = 'icon-cdt-excel';
                break;
            case 'PT':
                icon = 'icon-cdt-powerpoint';
                break;
            case 'XM':
                icon = 'icon-cdt-xml';
                break;
            case 'HT':
                icon = 'icon-cdt-html';
                break;
            case 'ID':
                icon = 'icon-cdt-indd';
                break;
            case 'JG':
                icon = 'icon-cdt-jpg';
                break;
            case 'PM':
                icon = 'icon-cdt-pagemaker';
                break;
            case 'PU':
                icon = 'icon-cdt-publisher';
                break;
            case 'TX':
                icon = 'icon-cdt-txt';
                break;
            case 'WP':
                icon = 'icon-cdt-wordperfect';
                break;
            case 'SD':
                icon = 'icon-cdt-sdl';
                break;
            case 'PC':
                icon = 'icon-cdt-pac';
                break;
            case 'SR':
                icon = 'icon-cdt-srt';
                break;
            case 'W3':
                icon = 'icon-cdt-w32';
                break;
            case 'VT':
                icon = 'icon-cdt-vtt';
                break;
            default:
                icon = 'icon-cdt-default';
                break;
        }
        return `<i class="${icon} fa-2x"></i>`;
    }
}
