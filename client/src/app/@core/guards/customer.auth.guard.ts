import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StringConst } from '../utils/string-constants';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()

export class AuthUserGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // return this.checkLogin();
        if (localStorage.getItem(StringConst.CUSTOMER_LOCAL_STORAGE_NAME)) {
            return true;
        }
        if (state.url.indexOf('/customer') != -1)
            this.router.navigate(['/']);
        else
            this.router.navigate(['/']);
        return false;
    }
}
