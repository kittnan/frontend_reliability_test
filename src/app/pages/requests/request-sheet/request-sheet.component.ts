import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-request-sheet',
  templateUrl: './request-sheet.component.html',
  styleUrls: ['./request-sheet.component.scss']
})
export class RequestSheetComponent implements OnInit {

  requestDetail: any;
  testingPurpose: any;
  testingType: any;
  constructor(
    private _home_service: HomeServiceService,

  ) { }

  ngOnInit(): void {
    this._home_service.setBehaviorMaster();
  }

  foo(){
    
  }

}
