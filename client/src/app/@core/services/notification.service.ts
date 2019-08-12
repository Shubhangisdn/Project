
import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {
  }

  private notification(title, text, type) {
    swal(title, text, type);
  }


  private toast(title, type) {
    swal({
      position: 'top-end',
      type: type,
      title: title,
      showConfirmButton: false,
      toast: true,
      timer: 3000
    });
  }
  public exampleToast(title) {
    swal({
      position: 'top-end',
      type: "info",
      title: title,
      showConfirmButton: false,
      toast: true,
    });
  }
  htmlNotification(body, type?: String, title?: String, showCloseButton = true, showCancelButton = false, focusConfirm = false, confirmButtonText = '<i class="fa fa-thumbs-up"></i> Okay!', confirmButtonAriaLabel = "Thumbs up, great!", cancelButtonText = '<i class="fa fa-thumbs-down"></i>', cancelButtonAriaLabel = 'Thumbs down') {
    let obj = {
      html: body,
      showCancelButton: showCancelButton,
      showCloseButton: showCloseButton,
      focusConfirm: focusConfirm,
      confirmButtonText: confirmButtonText,
      confirmButtonAriaLabel: confirmButtonAriaLabel
    }
    if (type)
      obj['type'] = type;
    if (showCancelButton) {
      obj['cancelButtonText'] = cancelButtonText;
      obj['cancelButtonAriaLabel'] = cancelButtonAriaLabel;
    }
    if (title)
      obj['title'] = title;
    swal(obj);
  }

  confirm(text, title = 'Are you sure?', confirmtype?: any, confirmButtonText = 'Proceed') {
    let obj = {
      title: title,
      text: text,
      type: confirmtype,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    }
    return swal(obj);
  }

  showloading(text = '', title = 'Loading..') {
    swal({ title, text, allowOutsideClick: false, allowEscapeKey: false });
    swal.showLoading();
  }

  hideLoading() {
    swal.hideLoading();
  }

  infoNotification(text, title = 'Information') {
    this.notification(title, text, 'info');
  }

  errorNotification(text, title = 'Error') {
    this.notification(title, text, 'error');
  }

  warningNotification(text, title = 'Warning') {
    this.notification(title, text, 'warning');
  }

  questionNotification(text, title = 'Question') {
    this.notification(title, text, 'question');
  }

  successNotification(text, title = 'Success') {
    this.notification(title, text, 'success');
  }

  infoToast(title) {
    this.toast(title, 'info');
  }

  errorToast(title) {
    this.toast(title, 'error');
  }

  warningToast(title) {
    this.toast(title, 'warning');
  }

  questionToast(title) {
    this.toast(title, 'question');
  }

  successToast(title) {
    this.toast(title, 'success');
  }

}
