import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';


@Injectable({
    providedIn: 'root'
})
export class ChargeService {

    constructor(public http: HttpClient) { }

    addCharges(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_CHARGES, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    getChargesById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_CHARGES_BY_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    updateCharges(id, data): Observable<any> {
        if (id && data) {
            return this.http.put(ElesAppConst.UPDATE_CHARGES, { params: { id, data } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getCharges(): Observable<any> {
        return this.http.get(ElesAppConst.GET_CHARGES);
    }
    deleteCharges(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_CHARGES, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    //Subscription Plan for 6 months and 1 year
    editSubscriptionCharge(id, data): Observable<any> {
        if (id && data) {
            return this.http.put(ElesAppConst.UPDATE_SUBSCRIPTION_CHARGES, { params: { id, data } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getChargeById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_SUBSCRIPTION_CHARGE_BY_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
}

