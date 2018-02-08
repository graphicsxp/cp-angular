import { Component } from '@angular/core';
import { AuthService } from '../../../security/auth.service';

@Component({
    selector: 'cdt-navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    constructor(public authService: AuthService) {

    }
}
