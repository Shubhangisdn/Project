/*
Other Person: N/A
Coded Start Date: 11/09/18
Coded End Date: 11/09/18
Description: Following is used to validate name, mobile number etc using REGEX
*/

import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TnFormErrorService {
    constructor() { }


    emailValidator(control: FormControl) {
        let email = control.value;
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z]([a-z]*[a-z]\.[a-z]([a-z]*[a-z])?)*$/i;

        if (email && email != "" && (email.length <= 5 || !EMAIL_REGEXP.test(email))) {
            return { "email": { "message": "Please enter valid email address" } };
        }
        return null;
    }
    nameValidator(control: FormControl) {
        let name = control.value;
        let NAME_REGEXP = /^[a-zA-Z \.]*$/i;

        if (name && name != "" && (name.length < 2 || !NAME_REGEXP.test(name))) {
            return {
                "name": { "message": "Please enter valid name" }
            };
        }
        return null;
    }
    numberValidator(control: FormControl) {
        let number = control.value;
        let NUMBER_REGEXP = /^(0|[1-9]\d*)$/


        if (number && number != "" && !NUMBER_REGEXP.test(number)) {
            return { "number": { "message": "Please enter valid Number" } };
        }
        return null;
    }
    phoneValidator(control: FormControl) {
        let name = control.value;
        let PHONE_REGEXP = /^\d{3}\d{3}\d{4}$/;
        if (name && name != "" && (name.length <= 8 || !PHONE_REGEXP.test(name))) {
            return { "email": { "message": "Please enter valid phone number" } };
        }

    }
    faxValidator(control: FormControl) {
        let name = control.value;
        let FAX_REGEXP = /^\+?[0-9]{10,}$/;
        if (name && name != "" && (name.length <= 8 || !FAX_REGEXP.test(name))) {
            return { "email": { "message": "Please enter valid fax number" } };
        }
    }
}
