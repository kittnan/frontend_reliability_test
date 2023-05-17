import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from '../shared/alert/alert.service';

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
    private route: ActivatedRoute,
    private _alert: AlertService
  ) { }

  ngOnInit(): void {

    // this._alert.success('')

    // const auth = localStorage.getItem('RLS_authorize')
    // const token = localStorage.getItem('RLS_token')
    // if (token && !auth) {
    //   localStorage.clear()
    //   location.reload()
    // }

    if (localStorage.getItem('RLS_id')) {
      this._login.validFormId(localStorage.getItem('RLS_authorize'))
    }

  }

  onLogin() {
    this._login.onLogin(this.LoginForm.value)
  }

}
