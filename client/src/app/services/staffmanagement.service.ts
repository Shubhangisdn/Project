import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';

@Injectable({
    providedIn: 'root'
})
export class StaffManagementService {

    constructor(public http: HttpClient) { }

    addStaff(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_STAFF, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }


    getStaffs(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.GET_STAFFS, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    searchFeild(data): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.SEARCH_STAFF, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    addStaffType(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_STAFF_TYPE, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getStaffTypes(): Observable<any> {
        return this.http.get(ElesAppConst.GET_STAFFTYPES);
    }

    deleteStaff(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_STAFF, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    updateStaff(id, data): Observable<any> {
        if (id && data) {
            return this.http.put(ElesAppConst.UPDATE_STAFF_DETAIL, { params: { id, data } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getStaffById(staff_id): Observable<any> {
        if (staff_id) {
            return this.http.get(ElesAppConst.ADD_STAFF_DETAIL, { params: { staff_id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    // getStaffTypeList(): Observable<any> {
    //     return this.http.get(ElesAppConst.GET_STAFF_TYPES);
    // }
    getStaffTypeList(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.GET_STAFF_TYPES, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    deleteStaffType(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_STAFF_TYPE, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getStaffTypeById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.ADD_STAFF_TYPE_DETAIL, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    updateStaffType(id, data): Observable<any> {
        if (data && id) {
            return this.http.put(ElesAppConst.UPDATE_STAFF_TYPE_DETAIL, { params: { id, data } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    addStaffPermission(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_STAFF_PERMISSION, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getPermissionsList(): Observable<any> {
        return this.http.post(ElesAppConst.GET_STAFF_PERMISSIONS_LIST, {});
    }
    getParentPermissionsList(): Observable<any> {
        return this.http.get(ElesAppConst.GET_STAFF_PARENT_PERMISSIONS_LIST);
    }

    getStaffsInOut(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.GET_IN_OUT_LIST, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    updateStaffInOutTime(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.GET_IN_OUT_TIME, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getOrgChart(): Observable<any> {
        return this.http.get(ElesAppConst.GET_ORG_CHART);
    }
}