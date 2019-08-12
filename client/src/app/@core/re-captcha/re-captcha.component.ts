import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bac-re-captcha',
  template: '<re-captcha (resolved)="resolved($event)" siteKey="6LdsqwUTAAAAAPDuvWqGa1uXqlbkdKI8oS5-UW4H"></re-captcha>',
  styles: []
})
export class ReCaptchaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

}
