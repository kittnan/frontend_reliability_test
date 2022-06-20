import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  })
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(){
    if(this.LoginForm.value.username  == 're' && this.LoginForm.value.password == 're'){
      this.router.navigate(['/request'])
    }
    if(this.LoginForm.value.username  == 'ap' && this.LoginForm.value.password == 'ap'){
      this.router.navigate(['/approve'])
    }
  }

}
