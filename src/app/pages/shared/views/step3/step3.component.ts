import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  }


}
