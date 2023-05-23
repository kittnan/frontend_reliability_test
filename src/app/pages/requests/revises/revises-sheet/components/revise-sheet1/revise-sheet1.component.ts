import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-revise-sheet1',
  templateUrl: './revise-sheet1.component.html',
  styleUrls: ['./revise-sheet1.component.scss']
})
export class ReviseSheet1Component implements OnInit {

  @Input() form: any = null
  constructor(
    private _stepper: CdkStepper
  ) { }

  ngOnInit(): void {
  }
  handleCancel() {

  }


}
