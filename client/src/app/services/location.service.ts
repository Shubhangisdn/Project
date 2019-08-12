import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';


@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(public http: HttpClient) { }

   
    getFilterCountries(): Observable<any> {
        return this.http.get(ElesAppConst.GET_FILTER_COUNTRIES);
    }
    addCity(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_CITY, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    addState(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_STATE, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
   
}

