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
  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    console.log(this.step4);

  }
  showUserRequest(key: string) {
    const foo = this.step4.find((o: any) => o.access === 'request')
    if (key === 'name') return foo.name.name;
    if (key === 'time') return foo.time
  }
  showUserApprove(key: string) {
    const foo = this.step4.find((o: any) => o.access === 'request_approve');
    if (key === 'name') return foo.name.name;
    if (key === 'time') return foo.time;
  }

}
