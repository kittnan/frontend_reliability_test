import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HomeServiceService } from './home-service.service';
export interface Section {
  name: string;
  updated: Date;
  size: number
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _home_service: HomeServiceService
  ) { }

  ngOnInit(): void {
    this._home_service.setBehaviorMaster();
  }



}
