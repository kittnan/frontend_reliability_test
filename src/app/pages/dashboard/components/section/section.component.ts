import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss'],
    standalone: false
})
export class SectionComponent implements OnInit {

  @Input() section!: any[]
  constructor() { }

  ngOnInit(): void {
  }

}
