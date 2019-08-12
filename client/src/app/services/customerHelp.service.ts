import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';


@Injectable({
    providedIn: 'root'
})
export class CustomerHelpService {

    constructor(public http: HttpClient) { }

    addhelpdetails(data): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.ADD_CUSTOMER_HELP_DETAILS, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    // getURL(): Observable<any> {
    //     if () {
    //         return this.http.get(ElesAppConst.GET_BANK_DETAILS_BY_ID, { params: { id } });
    //     } else {
    //         return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
    //     }
    // }
    
    trackShipment(data): Observable<any> {
        if (data) {
           console.log(" data   >",data)
            return this.http.post(ElesAppConst.TRACK_SHIPMENT, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
  
}

