import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(
    // private cdref: ChangeDetectorRef
  ) {

  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }
  // ngAfterContentChecked() {

  //   this.cdref.detectChanges();

  // }



}
