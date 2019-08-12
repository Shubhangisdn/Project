import { Injectable, EventEmitter } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    ActivatedRoute
} from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { NotificationService } from '../../@core/services/notification.service';
import * as _ from 'underscore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AccessGuard implements CanActivate {
    //permission 
    permission: any = [];
    permission_addedit: boolean = false;
    constructor(
        private router: Router,
        private adminService: AdminService,
        private notificationService: NotificationService


    ) { }
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const action = route.data.action || '';
        const controller = route.data.controller || '';
        let list_controller = this.adminService.permission['controller'];
        let controller_actions = this.adminService.permission['action_map'];

        if (!action && !controller) {
            return true;
        }
        console.log(">>>>>>>>>>>>????????????????????", list_controller, controller, controller_actions, action);
        if (_.contains(list_controller, controller) && _.contains(controller_actions[controller], action)) {
            return true;
        } else {
            this.router.navigate(['/bac/dashboard']);
            this.notificationService.errorToast('You are not authorised user for access this');
            return false;
        }
        // this.adminService.getPermission().subscribe(permissions_data =>{
        // var list_controller = permissions_data['data'].controller || [];
        // var controller_actions = permissions_data['data'].action_map || [];

        // if (_.contains(list_controller, controller) && _.contains(controller_actions[controller], action)) {
        //         console.log('chal gaya');            
        //         return true;
        //     } else {
        //         console.log('fatla re');
        //         this.router.navigate(['/admin/dashboard']);
        //         this.notificationService.errorToast('You don\'t have permission to access this page');
        //         return false;
        //     }
        // })



    }
}
