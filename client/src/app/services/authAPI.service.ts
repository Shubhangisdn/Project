import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Observer, observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthAPIService {
    constructor(public http: HttpClient, public router: Router) { }
    customerSocialLogin(credentials, type): Observable<any> {
        if (credentials) {
            return this.http.post(ElesAppConst.CUSTOMER_SOCIAL_LOGIN + type, credentials);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('userData'));
    }
    getLogo(): Observable<any> {
        return this.http.get(ElesAppConst.GET_LOGO_DASHBOARD);
    }
    sessionIn() {
        let A;
        if (this.getData()) {
            A = this.router.navigate(['/customer'], this.getData());
        }
        return A;
    }

    sessionOut() {
        let A;
        if (!this.getData()) {
            A = this.router.navigate(['']);
        }
        return A;
    }

    logOut() {
        localStorage.setItem('userData', '');
        localStorage.clear();
        return this.router.navigate(['']);
    }

}
