import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TnFormErrorService } from '../@core/services/tn-form-error.service';
import { NotificationService } from '../@core/services/notification.service';
import { AuthenticationService } from '../services/authentication.service';
import { AdminService } from '../services/admin.service';
import { StringConst } from '../@core/utils/string-constants';
import { HelperService } from '../services/helper.service';


@Component({
  selector: 'bac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  url: any;
  constructor(
    private tnFormErrorService: TnFormErrorService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private adminService: AdminService,
    private helperService: HelperService,

  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        this.tnFormErrorService.emailValidator
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    this.getLogo();
  }
  getLogo() {
    this.authenticationService.getLogo().subscribe(
      result => {
        this.url = result.data.url;
      },
      err => {
        console.log('error');
      });
  }
  login() {
    setTimeout(() => {
    }, 0);
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.authenticationService
        .staffLogin(data)
        .subscribe((res) => {
          if (res['code'] == 200) {

            localStorage.setItem('branch', "PROFESSIONAL");
            this.helperService.setUserData(res.data);
            this.router.navigate(['/bac/dashboard']);
            this.adminService.setStaffDetails(res.data);
            localStorage.setItem(StringConst.ADMIN_LOCAL_STORAGE_NAME, res['token']);
            this.notificationService.successToast(res['message']);
          } else {
            this.notificationService.errorToast(res['message']);
          }
        }, (err) => {
          this.notificationService.errorToast(StringConst.PLEASE_TRY_AGAIN_LATER);
        });
    } else {
      this.notificationService.errorToast(StringConst.INVALID_INFORMATION);
    }
  }
  reset() {
    this.loginForm.reset();
  }
}
