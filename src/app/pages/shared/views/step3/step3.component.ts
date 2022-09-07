import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TestingTypeForm {
  group: string,
  [list: string]: any

}

export interface TestingList {
  _id: string,
  name: string,
  checked: boolean,
  description: {
    status: boolean,
    value: string
  }
}

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  @Input() step3: any;
  @Output() step3Change = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    console.log(this.step3);
    
  }


  showSelectInterval(item:any){
    const temp = item
    return temp?.map((t:any)=>t.name)
  }
  showSelectReportList(item:any){
    const temp = item
    return temp?.map((t:any)=>t.name)
  }

}
