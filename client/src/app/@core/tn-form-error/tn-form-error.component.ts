import { OnInit } from '@angular/core';
/*
Other Person: N/A
Coded Start Date: 12-09-18
Coded End Date: 12-09-18
Description: Following is used in reactive forms to validation
*/

import { AbstractControl, AbstractControlDirective } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'tn-form-error',
    template: `
    <ul *ngIf="shouldShowErrors()">
      <li [ngClass]="{'text-primary-blue':changecolor, 'text-danger':!changecolor}" *ngFor="let error of listOfErrors()">{{error}}</li>
    </ul>
    `,
    styles: [`
    ul{
      padding: 0;
      list-style: none;
      font-size: small;
    }`
    ]
})
export class TnFormErrorComponent {


    private static readonly errorMessages = {
        'required': (params, msg) => msg + ' is required',
        'minlength': (params, msg) => ' The min number of characters is ' + params.requiredLength,
        'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
        'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
        'year': (params) => params.message,
        'email': (params) => params.message,
        'name': (params) => params.message,
        'error': (params) => params.message,
        'number': (params) => params.message,
        'mobile': (params) => params.message,
        'url': (params) => params.message,
        'urlPresent': (params) => params.message,
        'expiry_year': (params) => params.message,
        'expiry_month': (params) => params.message,
        'zipcode': (params) => params.message
    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;
    @Input()
    private changecolor: boolean = false;
    @Input() msg: string = 'Field';

    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.msg));
    }


    private getMessage(type: string, params: any, msg: string) {
        return TnFormErrorComponent.errorMessages[type](params, msg);
    }
}
