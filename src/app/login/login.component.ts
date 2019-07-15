import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/auth/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(public log: LoginService,
              public  router: Router) {

    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  login() {
    this.log.userLogin({email: this.form.value.email, password: this.form.value.password})
      .subscribe(response => {
        console.log(response);
        location.href = '/';
        this.router.navigate(['']);

      }, err => {
        console.log(err);
      })
  }

}
