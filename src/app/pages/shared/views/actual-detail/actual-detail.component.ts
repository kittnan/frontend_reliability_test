import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-actual-detail',
  templateUrl: './actual-detail.component.html',
  styleUrls: ['./actual-detail.component.scss']
})
export class ActualDetailComponent implements OnInit {

  @Input() queues: any
  constructor() { }

  ngOnInit(): void {
  }
  jump2(id: string) {
    setTimeout(() => {
      (document.getElementById(id) as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 500);
  }
}
