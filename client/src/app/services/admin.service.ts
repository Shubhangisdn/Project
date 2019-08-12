import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Observer, observable } from 'rxjs';
// import { StringConst } from './../../../@core/utils/string-constants.';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';



@Injectable({
    providedIn: 'root'
})
export class AdminService {
    public staff: any = [];
    public permission: any = [];
    constructor(public http: HttpClient) { }
    //    showHideSpinner: Subject<any> = new Subject<any>();

    setStaffDetails(data) {
        this.staff = data;
    }

    getStaffDetails(): Observable<any> {
        if (this.staff) {
            return Observable.create((observer: Observer<any>) => { return observer.next(this.staff) });
        } else {
            //    return this.http.get(ElesAppConst.ADD_STAFF_DETAIL);
        }
        // if (value) {
        //     return this.http.post(ElesAppConst.STAFF_LOGIN, value);
        // } else {
        //     return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        // }
    }
    setPermission(permission) {
        this.permission = permission;
    }
    getPermission(): Observable<any> {
        if (this.permission && this.permission.length > 0) {
            return Observable.create((observer: Observer<any>) => { return observer.next(this.permission) });
        } else {
            return this.http.get(ElesAppConst.GET_STAFF_ASSIGN_PERMISSION);
        }
    }
    logout(): Observable<any> {
        return this.http.post(ElesAppConst.STAFF_LOGOUT, {});
    }

    // get the list of customer shipping requests
    getShippingRequests(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.SHIPPING_REQUEST_ITEMS, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    searchDeliveryDate(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.SEARCH_DELIVERY_DATE, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    deleteService(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_SERVICE, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getCustomerQuote(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.GET_CUSTOMER_QUOTE, request_obj);
        }
        else {
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

    //get logged in staff data in profile
    gettingStaffDetail(): Observable<any> {
        return this.http.get(ElesAppConst.GETTING_STAFF_DETAILS, {});
    }

    //chANGE password
    changePwd(data): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.STAFF_CHANGE_PASSWORD, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    //edit Customer get quotes
    getQuoteDataByID(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_QUOTE_DATA_BY_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    // updateCustomerGetQuote(data): Observable<any> {
    //     if (data) {
    //         return this.http.put(ElesAppConst.UPDATE_CUSTOMER_GET_QUOTE, data, { params: {  } });
    //     } else {
    //         return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
    //     }
    // }

    updateGetQuote(id, data): Observable<any> {
        console.log('dataaaaaa', data, id)
        if (data && id) {
            return this.http.put(ElesAppConst.UPDATE_GET_QUOTE, { params: { id, data } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    getProductTypelist(): Observable<any> {
        return this.http.get(ElesAppConst.GET_PRODUCT_TYPE);
    }

    uploadStaffImage(obj: FormData): Observable<any> {
        if (obj.has('staff_image')) {
            return this.http.post(ElesAppConst.UPLOAD_STAFF_IMAGE, obj);
        } else {
            return Observable.create((observer: Observer<any>) => {
                return observer.error(StringConst.INVALID_INFORMATION);
            });
        }
    }
    uploadLogo(obj: FormData): Observable<any> {
        if (obj.has('logo')) {
            return this.http.post(ElesAppConst.UPLOAD_LOGO, obj);
        } else {
            return Observable.create((observer: Observer<any>) => {
                return observer.error(StringConst.INVALID_INFORMATION);
            });
        }
    }
    getLogo(): Observable<any> {
        return this.http.get(ElesAppConst.GET_LOGO);
    }
    getnotificationbyuser(): Observable<any> {
        return this.http.get(ElesAppConst.GET_NOTIFICATION_BY_USER);
    }
    markAsRead(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.MARK_AS_READ, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getDeliveryById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_DELIVERY_BY_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    updatePickupDetails(id, data): Observable<any> {
        if (id && data) {
            return this.http.put(ElesAppConst.UPDATE_PICKUP_DETAILS, { params: { data, id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    searchFeild(data): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.SEARCH_PAYMENT_PICKUP, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    deletequotedetails(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_QUOTE_DETAILS, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getDataBySelection(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_QUOTES_BY_LIMIT, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    // searchPickupDate(id): Observable<any> {
    //     if (id) {
    //         return this.http.get(ElesAppConst.SEARCH_BLOCKED_DATE, { params: { id } });
    //     } else {
    //         return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
    //     }
    // }
    delete_Quote(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_BULK_QUOTE, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    sortData(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.SORT_DATA, request_obj);
        }
        else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });

        }
    }
    getCustomerDetailById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_CUSTOMER_DETAIL_BY_ID, { params: { id: id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    updateCustomerByAdmin(id, data): Observable<any> {
        console.log('dataaaaaa', data, id)
        if (data && id) {
            return this.http.put(ElesAppConst.UPDATE_CUSTOMER_BY_ADMIN, data, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    getUserCount(): Observable<any> {
        return this.http.get(ElesAppConst.GET_USER_COUNT, {});
    }

    getDeliveriesCount(): Observable<any> {
        return this.http.get(ElesAppConst.GET_DELIVERIES_COUNT, {});
    }
    getPieChartData(): Observable<any> {
        return this.http.get(ElesAppConst.GET_PIE_CHART_DATA, {});
    }
    getQuotesCount(): Observable<any> {
        return this.http.get(ElesAppConst.GET_QUOTES_COUNT, {});
    }
    getUserGraphData(data): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.GET_USER_GRAPH_DATA, data);
        }
        else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });

        }
    }

    getContactList(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.GET_CONTACT_LIST, request_obj);
        }
        else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });

        }
    }
    deleteContact(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_CONTACT, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getZohoCount(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.GET_ZOHO_COUNT, request_obj);
        }
        else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
}
