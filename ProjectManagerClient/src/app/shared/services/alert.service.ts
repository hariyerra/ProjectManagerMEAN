import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
 
@Injectable()
export class AlertService {
    private keepAfterRouteChange = false;
 
    constructor(private router: Router, private toastr:ToastrService) {
        
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.toastr.clear();
                }
            }
        });
    }
  
    success(message: string, title:string,timeout:number, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.toastr.success(message,title, {timeOut:timeout});
    }

    error(message: string, title:string,timeout:number, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.toastr.error(message,title, {timeOut:timeout});
    }
 
    info(message: string, title:string,timeout:number, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.toastr.info(message,title, {timeOut:timeout});
    }

    warn(message: string, title:string,timeout:number, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.toastr.warning(message,title, {timeOut:timeout});
    }

    clear() {
        this.toastr.clear();
    }
}