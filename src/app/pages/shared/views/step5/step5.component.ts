import { RequestHttpService } from './../../../../http/request-http.service';
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
  form: any
  constructor(
    private $request: RequestHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    this.form = await this.$request.get_id(this.step5[0].requestId).toPromise()
    let level = this.form[0].level.toString()
    if (level.length == 3) {
      const sp = level.split("")[2]
      level = Number(sp)
    }
    const filterStep5 = this.step5.filter((s: any) => s.level <= level && s.date)
    const resultMap: any = await this.mapRes(filterStep5)
    this.data = resultMap.sort((a: any, b: any) => Number(a.level) < Number(b.level) ? -1 : Number(a.level > b.level))
  }


  mapRes(data: any) {
    return new Promise(resolve => {
      const temp = data.map((d: any) => {
        if (d.level == 1 || d.level == 2 || d.level == 3 || d.level == 4 || d.level == 5 || d.level == 6 || d.level == 7) {
          let footer = d.level == 1 ? 'Subchief Level Up' : 'Engineer Level Up'
          d.level == 3 ? footer = 'Staff Level Up' : footer
          return {
            title: d.prevStatusForm,
            footer: footer,
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
