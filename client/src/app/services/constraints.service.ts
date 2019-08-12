import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';


@Injectable({
    providedIn: 'root'
})
export class ConstraintsService {
    
    constructor(public http: HttpClient) { }

    addConstraints(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_CONSTRAINTS, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
   
    getConstraintsById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_CONSTRAINTS_BY_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    updateConstraints(id, data): Observable<any> {
        if (data && id) {
            return this.http.put(ElesAppConst.UPDATE_CONSTRAINTS, { params: { id, data } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getConstraints(): Observable<any> {
        return this.http.get(ElesAppConst.GET_CONSTRAINTS);
    }
    deleteConstraints(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_CONSTRAINTS, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
}

