import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {

  @Input() step4: any
  @Output() step4Change = new EventEmitter<any>();
  table_title = [
    {
      name: 'request',
      value: 1,
      footer: 'Staff or Upper Level'
    },
    {
      name: 'approve',
      value: 2,
      footer: 'Staff or Upper Level'
    },
    {
      name: 'qe window person',
      value: 3,
      footer: 'Staff or Upper Level'
    },
    {
      name: 'qe engineer',
      value: 4,
      footer: 'Staff or Upper Level'
    },
    {
      name: 'qe section head',
      value: 5,
      footer: 'Staff or Upper Level'
    },
    {
      name: 'qe department head',
      value: 6,
      footer: 'Staff or Upper Level'
    },
  ]
  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    console.clear()
    console.log(this.step4);

  }
  show(item: any, key: any) {
    if (item && item.value === 1) {
      const resultFind = this.step4.find((o: any) => o.access === 'request')
      if (resultFind && resultFind.status) {
        if (key === 'name') return resultFind.name.name;
        if (key === 'time') return resultFind.time
      }
    }
    if (item && item.value === 2) {
      const resultFind = this.step4.find((o: any) => o.access === 'request_approve');
      if (resultFind && resultFind.status) {
        if (key === 'name') return resultFind.name.name;
        if (key === 'time') return resultFind.time;
      }
    }
    if (item && item.value === 3) {
      const resultFind = this.step4.find((o: any) => o.access === 'qe_window_person');
      if (resultFind && resultFind.status) {
        if (key === 'name') return resultFind.name.name;
        if (key === 'time') return resultFind.time;
      }
    }
    if (item && item.value === 4) {
      const resultFind = this.step4.find((o: any) => o.access === 'qe_engineer');
      if (resultFind && resultFind.status) {
        if (key === 'name') return resultFind.name.name;
        if (key === 'time') return resultFind.time;
      }
    }
    if (item && item.value === 5) {
      const resultFind = this.step4.find((o: any) => o.access === 'qe_section_head');
      if (resultFind && resultFind.status) {
        if (key === 'name') return resultFind.name.name;
        if (key === 'time') return resultFind.time;
      }
    }
    if (item && item.value === 6) {
      const resultFind = this.step4.find((o: any) => o.access === 'qe_department_head');
      if (resultFind && resultFind.status) {
        if (key === 'name') return resultFind.name.name;
        if (key === 'time') return resultFind.time;
      }
    }
  }
  // showUserRequest(key: string) {
  //   const foo = this.step4.find((o: any) => o.access === 'request')
  //   if (key === 'name') return foo.name.name;
  //   if (key === 'time') return foo.time
  // }
  // showUserApprove(key: string) {
  //   const foo = this.step4.find((o: any) => o.access === 'request_approve');
  //   if (key === 'name') return foo.name.name;
  //   if (key === 'time') return foo.time;
  // }
  // showUserQEWindow(key: string) {
  //   const foo = this.step4.find((o: any) => o.access === 'qe_window');
  //   if (key === 'name') return foo.name.name;
  //   if (key === 'time') return foo.time;
  // }

}
