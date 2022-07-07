import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-manage',
  templateUrl: './master-manage.component.html',
  styleUrls: ['./master-manage.component.scss']
})
export class MasterManageComponent implements OnInit {

  masterList:any[] = ['authorize','interval','department','model','testPurpose','testingType']
  masterSelected:any;
  constructor() { }

  ngOnInit(): void {
  }



}
