import { Component } from '@angular/core';

@Component({
    selector: 'cdt-custom-footer',
    templateUrl: './customfooter.component.html'
})

export class CustomFooterComponent {
    currentYear: number = new Date().getFullYear();
}
