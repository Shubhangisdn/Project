import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, Observer } from 'rxjs';
import { ElesAppConst } from '../@core/utils/eles-app-constant';
import { HttpClient } from '@angular/common/http';
import { StringConst } from '../@core/utils/string-constants';
/**
  * @Author: Astha
  * @Date  : 15/11/2015
  * Service: HelperService
  * @Description:
  *          -: Create Helper Service to access data in all component
  */
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public http: HttpClient) { }
  public userdata = new ReplaySubject<Array<Object>>();
  public getQuoteData = new ReplaySubject<Array<Object>>();
  public getProfile = new ReplaySubject<Array<Object>>();
  public getDeliveryData = new ReplaySubject<Array<Object>>();
  public getloader = new ReplaySubject<Array<Object>>();
  public getheaderloader = new ReplaySubject<Array<Object>>();
  public staffImage = new ReplaySubject<Array<Object>>();
  public logo = new ReplaySubject<Array<Object>>();
  public customerImage = new ReplaySubject<Array<Object>>();
  public staffdetaildata = new ReplaySubject<Array<Object>>();
  public notificationdata = new ReplaySubject<Array<Object>>();
  public trackShipmentData = new ReplaySubject<Array<Object>>();
  public BAC_id = new ReplaySubject<Array<Object>>();
  setUserData(data: any) {
    this.userdata.next(data);
  }

  getUserData() {
    return this.userdata.asObservable();
  }

  setStaffDetailData(data: any) {
    this.staffdetaildata.next(data);
  }

  getStaffDetailData() {
    return this.staffdetaildata.asObservable();
  }
  setGetQuoteData(data: any) {
    this.getQuoteData.next(data);
  }
  getGetQuoteData() {
    return this.getQuoteData.asObservable();
  }
  getUploadProfilePicture(obj: FormData): Observable<any> {
    if (obj.has('customer_image')) {
      return this.http.post(ElesAppConst.GET_PROFILE_UPLOAD, obj);
    } else {
      return Observable.create((observer: Observer<any>) => {
        return observer.error(StringConst.INVALID_INFORMATION);
      });
    }
  }
  setProfileData(data: any) {
    this.getProfile.next(data);
  }
  getProfileData() {
    return this.getProfile.asObservable();
  }
  setLoader(loader: any) {
    this.getloader.next(loader);
  }
  getLoader() {
    return this.getloader.asObservable();
  }
  setHeaderLoader(loader: any) {
    this.getheaderloader.next(loader);
  }
  getHeaderLoader() {
    return this.getheaderloader.asObservable();
  }
  setStaffImage(data: any) {
    this.staffImage.next(data);
  }
  setLogo(data: any) {
    this.logo.next(data);
  }
  getLogo() {
    return this.logo.asObservable();
  }
  getStaffImage() {
    return this.staffImage.asObservable();
  }
  setCustomerImage(data: any) {
    this.customerImage.next(data);
  }
  getCustomerImage() {
    return this.customerImage.asObservable();
  }
  setNotificationData(data: any) {
    this.notificationdata.next(data);
  }
  getNotificationData() {
    return this.notificationdata.asObservable();
  }
  setTrackShipment(data: any) {
    this.trackShipmentData.next(data);
  }
  getTrackShipment() {
    return this.trackShipmentData.asObservable();
  }
  setDeliveryData(data: any) {
    this.getDeliveryData.next(data);
  }
  getdeliveryData() {
    return this.getDeliveryData.asObservable();
  }
  // setBAC_id(data:any){
  //   this.BAC_id.next(data);
  // }
  // getBac_id() {
  //   return this.BAC_id.asObservable();
  // }
}
