import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step4-two',
  templateUrl: './step4-two.component.html',
  styleUrls: ['./step4-two.component.scss']
})
export class Step4TwoComponent implements OnInit {
  @Input() step4: any
  constructor() { }

  ngOnInit(): void {
  }
  showUserQEWindow(key:any){
    const foo = this.step4.find((o: any) => o.access === 'qe_window_person')
    if (key === 'name') return foo.name.name;
    if (key === 'time') return foo.time
  }

}
