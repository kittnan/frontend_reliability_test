import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(
  ) {

  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    const arr = ['Name', '2', '3', '4', '5']
    let obj: any = { ...arr }
    console.log(obj);

    // for (let i = 0; i < arr.length; i++) {
    //   obj[arr[i]] = ''
    //   console.log(obj);

    // }
  }



}
