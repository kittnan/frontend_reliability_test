import { UserHttpService } from 'src/app/http/user-http.service';
import { RequestHttpService } from './../../../../http/request-http.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss'],
})
export class Step5Component implements OnInit {
  @Input() step5: any;
  @Output() step5Change = new EventEmitter<any>();
  data: any;
  form: any;
  constructor(
    private $request: RequestHttpService,
    private $user: UserHttpService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = await this.$request.get_id(this.step5[0].requestId).toPromise();
    let level = this.form[0].level.toString();
    if (level.length == 3) {
      const sp = level.split('')[2];
      level = Number(sp);
    }
    const filterStep5 = this.step5.filter(
      (s: any) => s.level <= level && s.date
    );
    const level6 = filterStep5?.find((a: any) => a.level === 6);
    const dataLevel6 = await this.$user
      .getUserById(level6?.prevUser._id)
      .toPromise();
    if (dataLevel6?.authorize?.some((a: any) => a !== 'qe_section_head')) {
      level6.prevStatusForm = 'qe_engineer2';
    }
    const resultMap: any = await this.mapRes(filterStep5);
    this.data = resultMap.sort((a: any, b: any) =>
      Number(a.level) < Number(b.level) ? -1 : Number(a.level > b.level)
    );
  }

  mapRes(data: any) {
    return new Promise((resolve) => {
      const temp = data.map((a: any, i: number) => {
        let footer = '';
        let title = '';
        let state = false;
        let level = [1, 2, 3, 4, 5, 6, 7];
        if (level.some((l: any) => l === a.level)) {
          if (a.prevStatusForm == 'request') {
            title = 'REQUEST';
            footer = 'Subchief Level Up';
            state = true;
          }
          if (a.prevStatusForm == 'request_approve') {
            title = 'REQUEST_APPROVE';
            footer = 'Engineer Level Up';
            state = true;
          }
          if (a.prevStatusForm == 'qe_window_person') {
            title = 'QE_WINDOW_PERSON';
            footer = 'Staff Level Up';
            state = true;
          }
          if (a.prevStatusForm == 'qe_engineer') {
            title = 'QE_ENGINEER';
            footer = 'Engineer Level Up';
            state = true;
          }
          if (a.prevStatusForm == 'qe_engineer2') {
            title = 'QE_SEC_HEAD';
            footer = 'Engineer Level Up';
            state = true;
          }
          if (a.prevStatusForm == 'qe_section_head') {
            title = 'QC_DEPT_HEAD';
            footer = 'Engineer Level Up';
            state = true;
          }
          if (a.prevStatusForm == 'request_confirm') {
            title = 'REQUEST_CONFIRM';
            footer = 'Subchief Level Up';
            state = true;
          }
          if (a.prevStatusForm == 'request_confirm_edited') {
            title = 'REQUEST_CONFIRM';
            footer = 'Subchief Level Up';
            state = true;
          }
          return {
            title: title,
            footer: footer,
            state: state,
            ...a,
          };
        } else {
          return {
            state: false,
          };
        }
      });
      // const temp = data.map((d: any) => {
      //   if (d.level == 1 || d.level == 2 || d.level == 3 || d.level == 4 || d.level == 5 || d.level == 6 || d.level == 7) {
      //     let footer = d.level == 1 ? 'Subchief Level Up' : 'Engineer Level Up'
      //     d.level == 3 ? footer = 'Staff Level Up' : footer
      //     let title = d.level == 5 || d.level == 6 ? d.level == 5 ? 'qe_sec_head' : 'qc_dept_head' : d.prevStatusForm
      //     return {
      //       title: title,
      //       footer: footer,
      //       state: true,
      //       ...d,
      //     }
      //   } else {
      //     return {
      //       state: false
      //     }
      //   }
      // })

      resolve(temp);
    });
  }
}
