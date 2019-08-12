import { StringConst } from '../utils/string-constants';

import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, config } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class InterceptorService {

    constructor(
        private route: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //  let token = this.route.url.includes('/admin') ? localStorage.getItem(StringConst.ADMIN_LOCAL_STORAGE_NAME);

        // tslint:disable-next-line:max-line-length
        const token = this.route.url.includes('/bac') ? localStorage.getItem(StringConst.ADMIN_LOCAL_STORAGE_NAME) : (localStorage.getItem(StringConst.CUSTOMER_LOCAL_STORAGE_NAME) ? localStorage.getItem(StringConst.CUSTOMER_LOCAL_STORAGE_NAME) : '');
        const authRequest = req.clone({
            setHeaders: {
                Authorization: `${token}`
            }
        });
        //console.log("tokentokentokentoken", authRequest)
        return next.handle(authRequest).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log(event);
                    if (event.body.code === 401) { // if user is not authorised direct him to login page
                        if (this.route.url.includes('/bac')) {
                            localStorage.removeItem(StringConst.ADMIN_LOCAL_STORAGE_NAME);
                            this.route.navigate(['/admin']);
                        } else {
                            localStorage.removeItem(StringConst.ADMIN_LOCAL_STORAGE_NAME);
                            this.route.navigate(['/login']);
                        }
                        return false;
                    }
                }
                // if(res['body'].code === 401)
                //   this.route.navigate(['/']);
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 0) {
                    console.log('Check Your Internet Connection And Try again Later');
                }
                return throwError(err);
            })
        );
    }
}