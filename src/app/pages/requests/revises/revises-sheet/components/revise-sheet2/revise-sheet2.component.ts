import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-revise-sheet2',
  templateUrl: './revise-sheet2.component.html',
  styleUrls: ['./revise-sheet2.component.scss']
})
export class ReviseSheet2Component implements OnInit {

  @Input() form: any = null
  constructor(
    private _stepper: CdkStepper
  ) { }

  ngOnInit(): void {
  }
}
