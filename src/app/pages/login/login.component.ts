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

    if (sessionStorage.getItem('_id')) {
      this._login.going(sessionStorage.getItem('authorize'))
    }
  }

  onLogin() {
    this._login.onLogin(this.LoginForm.value)
  }

}
