import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';


@Injectable({
    providedIn: 'root'
})
export class BankManagementService {

    constructor(public http: HttpClient) { }

    addbankdetails(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_BANK_DETAILS, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
   
    getbankdetailsById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_BANK_DETAILS_BY_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    updatebankdetails(id, data): Observable<any> {
        if (data && id) {
            return this.http.put(ElesAppConst.UPDATE_BANK_DETAILS, { params: { id, data } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getbankdetailslist(): Observable<any> {
        return this.http.get(ElesAppConst.GET_BANK_DEAILS_LIST);
    }
    deletebankdetails(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_BANK_DETAILS, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
}

