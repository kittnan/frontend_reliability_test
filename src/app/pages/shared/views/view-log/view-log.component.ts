import { Component, Input, OnInit } from '@angular/core';
import { LogFlowService } from 'src/app/http/log-flow.service';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.component.html',
  styleUrls: ['./view-log.component.scss']
})
export class ViewLogComponent implements OnInit {

  @Input() formId: any = null

  logsUser: any
  constructor(
    private $log: LogFlowService
  ) { }

  async ngOnInit(): Promise<void> {
    const resLogs: any = await this.$log.get(this.formId).toPromise()
    this.logsUser = resLogs.filter((r: any) => r.user)
  }

  convertCSS(action: string) {
    if (action.includes('reject')) return 'color:red;'
    if (action.includes('draft')) return 'color:#5495ff;'
    return 'color:green;'
  }

}
