import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  appVersion: any = environment.appVersion;

  LoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  mode: string = 'normal';
  constructor(private _login: LoginService) {}

  ngOnInit(): void {
    if (localStorage.getItem('RLS_id')) {
      this._login.validFormId(localStorage.getItem('RLS_authorize'));
    }
  }

  onLogin() {
    this._login.onLogin(this.LoginForm.value);
  }
  onLoginSSO() {
    this._login.onLoginSSO(this.LoginForm.value);
  }
}
