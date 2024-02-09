import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {
  @Input() corporate!: any[]
  constructor() { }

  ngOnInit(): void {

  }

}
