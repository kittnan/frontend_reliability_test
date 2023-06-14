import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RevisesHttpService } from 'src/app/http/revises-http.service';

@Component({
  selector: 'app-approve-revises-approve',
  templateUrl: './approve-revises-approve.component.html',
  styleUrls: ['./approve-revises-approve.component.scss']
})
export class ApproveRevisesApproveComponent implements OnInit {

  formRevise: any = null
  constructor(
    private _route: ActivatedRoute,
    private $revise: RevisesHttpService
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (res: any) => {
      console.log(res);
      const resQuery = await this.$revise.getByRequestId(new HttpParams().set('id', res['id'])).toPromise()
      console.log("🚀 ~ resQuery:", resQuery)
      this.formRevise = resQuery[0]
    })
  }

}
