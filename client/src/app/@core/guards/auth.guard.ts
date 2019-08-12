import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StringConst } from '../utils/string-constants';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // return this.checkLogin();
        if (localStorage.getItem(StringConst.ADMIN_LOCAL_STORAGE_NAME)) {
            return true;
        }
        if (state.url.indexOf('/bac') != -1)
            this.router.navigate(['/admin/login']);
        else
            this.router.navigate(['/login']);
        return false;
    }

}
// export class AuthUserGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private authenticationService: AuthenticationService
//     ) { }

//     canActivate(
//         next: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ): Observable<boolean> | Promise<boolean> | boolean {
//         // return this.checkLogin();
//         if (localStorage.getItem('__eSt')) {
//             return true;
//         }
//         if (state.url.indexOf('/admin') != -1)
//             this.router.navigate(['/authenticate/login']);
//         else
//             this.router.navigate(['/login']);
//         return false;
//     }
// }
