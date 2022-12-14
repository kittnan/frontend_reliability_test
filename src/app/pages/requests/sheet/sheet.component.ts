import { RequestHttpService } from './../../../http/request-http.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


interface requestForm {
  step1: any,
  step2: any
}
@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  params: any
  formId: any
  request: requestForm = {
    step1: null,
    step2: null
  }
  constructor(
    private active: ActivatedRoute,
    private $request: RequestHttpService
  ) {
    this.active.queryParams.subscribe(params => this.params = params)
  }

  ngOnInit(): void {
    if (this.params && this.params['id']) {
      this.formId = this.params['id']
      this.$request.get_id(this.params['id']).subscribe(res => {
        this.request = res[0]
      })
    }

  }
  emit(e: any) {
    this.formId = e
    alert(this.formId)

  }
}
