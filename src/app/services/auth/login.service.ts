import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogin = false;
  url: string = 'https://dev.tuten.cl/TutenREST/rest';

  constructor(private http: HttpClient) {

    this.isLogin = (localStorage.getItem('KEY_CREDENTIALS') == 'true');
  }

  public userLogin(data) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'password': data.password,
        'app': 'APP_BCK'
      })
    };
    const email = data.email;
    return this.http.put( this.url +`/user/${email}`, null, options)
      .pipe(
        map((response: any) => {
          localStorage.setItem('KEY_TOKEN', response.sessionTokenBck);
          localStorage.setItem('KEY_USER_EMAIL', response.email);
          localStorage.setItem('KEY_USER_NAME', response.firstName);
          localStorage.setItem('KEY_USER_LASTNAME', response.lastName);
          localStorage.setItem('KEY_CREDENTIALS', 'true');
          return response;
        })
      )
  }

  public isAuthenticated(): boolean {
    return this.isLogin;
  }
}
