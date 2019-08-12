import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationService {
  userid: any;
  constructor(private http: HttpClient, private router: Router) {

  }

  // function to get all notifications for logged in user
  getNotifications() {
    return this.http.get('sdff ');
  }
}