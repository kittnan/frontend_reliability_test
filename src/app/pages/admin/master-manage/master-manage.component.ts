import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-manage',
  templateUrl: './master-manage.component.html',
  styleUrls: ['./master-manage.component.scss']
})
export class MasterManageComponent implements OnInit {

  masterList: any[] = ['department', 'section', 'authorize', 'model', 'testPurpose', 'testingType', 'functionChamber']
  masterSelected: any;
  constructor() { }

  ngOnInit(): void {
  }



}
