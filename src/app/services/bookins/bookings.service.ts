import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  url: string = 'https://dev.tuten.cl/TutenREST/rest';
  apiToken: string;
  adminEmail: string;
  bookings: any;
  params: any;

  constructor(private http: HttpClient) {
    this.apiToken = localStorage.getItem('KEY_TOKEN');
    this.adminEmail = localStorage.getItem('KEY_USER_EMAIL');
  }

  public getBookings(email: string, isCurrent?: boolean) {
    this.params = new HttpParams();
    this.params = this.params.append('current', `${isCurrent}`);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'adminemail': this.adminEmail,
        'token': this.apiToken,
        'app': 'APP_BCK'
      }),
      params: this.params
    };

    return this.http.get(this.url + `/user/${email}/bookings`, options)
      .pipe(
        map((response: Array<any>) => {
          this.bookings = response;
          return response;
        })
      )
  }

  public filterBookings(searchTerm) {
    return this.bookings.filter((booking) => {
      return booking.bookingId.toString().indexOf(searchTerm) > -1;
    });
  }
}
