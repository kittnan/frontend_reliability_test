import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  })
  constructor(
    private _login: LoginService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('RLS_id')) {
      this._login.validFormId(localStorage.getItem('RLS_authorize'))
    }

  }

  onLogin() {
    this._login.onLogin(this.LoginForm.value)
  }

}
