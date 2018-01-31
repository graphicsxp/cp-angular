import { Component } from '@angular/core';

@Component({
    selector: 'cdt-about-component',
    templateUrl: './about.component.html'
})

export class AboutComponent {

    message: string;

    constructor() {
        this.message = 'Hello from AboutComponent constructor';
    }
}
