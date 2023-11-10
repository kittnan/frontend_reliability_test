import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-actual-detail',
  templateUrl: './plan-actual-detail.component.html',
  styleUrls: ['./plan-actual-detail.component.scss'],
})
export class PlanActualDetailComponent implements OnInit {
  @Input() queues: any;
  constructor() {}

  ngOnInit(): void {}

  jump2(id: string) {
    setTimeout(() => {
      (document.getElementById(id) as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }, 500);
  }

  onCalActual(item: any) {}
  onConfirmActual(item: any, index: number) {}
}
