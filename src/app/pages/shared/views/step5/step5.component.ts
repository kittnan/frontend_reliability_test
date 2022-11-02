import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component implements OnInit {

  @Input() step5: any;
  @Output() step5Change = new EventEmitter<any>();
  data: any;
  constructor() { }

  async ngOnInit(): Promise<void> {
    const resultMap: any = await this.mapRes(this.step5)
    this.data = resultMap.sort((a: any, b: any) => a.level < b.level ? -1 : Number(a.level > b.level))

  }

  mapRes(data: any) {
    return new Promise(resolve => {
      const temp = data.map((d: any) => {
        if (d.level == 1 || d.level == 2 || d.level == 3) {
          return {
            title: d.authorize,
            footer: 'Engineer Level Up',
            state: true,
            ...d,
          }
        } else {
          return {
            state: false
          }
        }
      })

      resolve(temp)
    })
  }

}
