import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { StringConst } from '../@core/utils/string-constants';


@Injectable({
    providedIn: 'root'
})
export class ShippingManagementService {

    constructor(public http: HttpClient) { }
    postPackages(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.POST_PACKAGES, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    verifiedPacks(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.VERIFIED_PACKS, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    addBranch(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.ADD_BRANCH, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    addJob(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.ADD_JOB, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    editBranch(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.EDIT_BRANCH, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getPackagesReleased(): Observable<any> {
        return this.http.get(ElesAppConst.GET_PACKAGES_RELEASED);
    }
    getStaffList(): Observable<any> {
        return this.http.get(ElesAppConst.GET_STAFF_LIST);
    }
    getReleasedPacks(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.RELEASED_PACK, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    undoPackRelease(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.UNDO_RELEASE, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getInvoices(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.INVOICES, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getPriceLists(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.PRICE_LIST, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getInvoiceById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_INVOICE_BY_ID_ZOHO, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getTrackingStatus(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_TRACKING_STATUS, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    mailInvoice(request_obj): Observable<any> {
        if (request_obj) {
            return this.http.post(ElesAppConst.MAIL_INVOICE, request_obj);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    addInformationDetails(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.ADD_INFORMATION_DETAILS, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    transferPack(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.TRANSFER_PACK, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    transferAssignedPackages(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.TRANSFER_ASSIGNED_PACK, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    sendInvoicefromzoho(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.SEND_INVOICE, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    releasePack(value): Observable<any> {
        if (value) {
            return this.http.post(ElesAppConst.RELEASE_PACK, value);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getPacks(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_PACKS, { params: { id } });

        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getInformationDetailsById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_INFORMATION_DETAILS_BY_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    updateinformationdetails(id, data): Observable<any> {
        if (data && id) {
            return this.http.put(ElesAppConst.UPDATE_INFORMATION_DETAILS, { params: { id, data } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getInformationDetailslist(): Observable<any> {
        return this.http.get(ElesAppConst.GET_INFORMATION_DETAILS_LIST);
    }
    getInvoiceWithTemplate(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_INVOICE_WITH_TEMPLATE, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

    generateInvoice(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GENERATE_INVOICE, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getInvoiceForCustomer(): Observable<any> {
        return this.http.get(ElesAppConst.GET_INVOICE_FOR_CUSTOMER);
    }
    getBranches(): Observable<any> {
        return this.http.get(ElesAppConst.GET_BRANCHES);
    }
    getJobs(): Observable<any> {
        return this.http.get(ElesAppConst.GET_JOBS);
    }
    deleteInformationDetails(id): Observable<any> {
        if (id) {
            return this.http.delete(ElesAppConst.DELETE_INFORMATION_DETAILS, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    generateShipping(fileToUpload): Observable<any> {
        if (fileToUpload) {
            const formData: FormData = new FormData();
            formData.append('shipping', fileToUpload, fileToUpload.name);
            return this.http.post(ElesAppConst.GENERATE_SHIPPING_FROM_FILE, formData);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getPackages(): Observable<any> {
        return this.http.get(ElesAppConst.GET_PACKAGES);
    }
    verifyPackage(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.VERIFY_PACKAGE, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    clearShipping(): Observable<any> {
        return this.http.get(ElesAppConst.CLEAR_SHIPPING);
    }
    searchFeild(data): Observable<any> {
        if (data) {
            return this.http.post(ElesAppConst.SEARCH_RELEASES, data);
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    getPackageById(id): Observable<any> {
        if (id) {
            return this.http.get(ElesAppConst.GET_PACKAGE_BY_ID, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }
    editPackageDetails(id, data): Observable<any> {
        if (data && id) {
            return this.http.put(ElesAppConst.EDIT_PACKAGE_DETAILS, data, { params: { id } });
        } else {
            return Observable.create((observer: Observer<any>) => { return observer.error(StringConst.INVALID_INFORMATION); });
        }
    }

}