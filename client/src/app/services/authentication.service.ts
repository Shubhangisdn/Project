import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';
import { Injectable } from '@angular/core';
import { Login, Register, ForgetPassword, ChangePassword } from '../modal/authentication';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(public http: HttpClient) { }

    staffLogin(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.STAFF_LOGIN, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    branchChangeforZohoUsers(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ZOHO_BRANCH_SWITCH, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    autodetectCarrier(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_CARRIER_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getLogo(): Observable<any> {
        return this.http.get(ElesAppConst.GET_LOGO_DASHBOARD);
    }
    register(data: Register): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.REGISTER, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); })
        }
    }
    customerLogin(data: Login): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.CUSTOMER_LOGIN, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
            // return Observable.throw(StringConst.INVALID_INFORMATION);
        }
    }
    mailboxLogin(data: Login): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.MAILBOX_LOGIN, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
            // return Observable.throw(StringConst.INVALID_INFORMATION);
        }
    }
    forgotPass(data: ForgetPassword): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.FORGOT_PASSWORD, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
            // return Observable.throw(StringConst.INVALID_INFORMATION);
        }
    }
    resetPass(data: ForgetPassword): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.RESET_PASSWORD, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
            // return Observable.throw(StringConst.INVALID_INFORMATION);
        }
    }
    adminforgotPass(data: ForgetPassword): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.ADMIN_FORGOT_PASSWORD, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
            // return Observable.throw(StringConst.INVALID_INFORMATION);
        }
    }

    staffChangePassword(data: ForgetPassword): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.ADMIN_RESET_PASSWORD, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getCouriers() {
        return this.http.get(ElesAppConst.GET_COURIERS);
    }
}
