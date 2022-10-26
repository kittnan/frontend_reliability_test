import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {

  @Input() step4: any
  @Output() step4Change = new EventEmitter<any>();

  ngOnInit(): void {
  }

}
