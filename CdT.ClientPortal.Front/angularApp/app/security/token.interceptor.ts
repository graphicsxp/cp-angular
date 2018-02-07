import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public injector: Injector, public router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // https://github.com/angular/angular/issues/18224
        const auth = this.injector.get(AuthService);
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        });

        return next.handle(request)
            .do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // redirect to the login route
                        // or show a modal
                        this.router.navigate(['/security/login'], { queryParams: { returnUrl: this.router.url } });
                    }
                }
            });
    }
}
