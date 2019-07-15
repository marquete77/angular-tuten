import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private log: LoginService
  ) { }

  canActivate(): boolean {
    if (!this.log.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
