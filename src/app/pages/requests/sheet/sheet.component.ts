import { RequestHttpService } from './../../../http/request-http.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  params: any
  request: any
  constructor(
    private active: ActivatedRoute,
    private $request: RequestHttpService
  ) {
    this.active.queryParams.subscribe(params => this.params = params)
  }

  ngOnInit(): void {
    console.log(this.params);
    if(this.params && this.params['id']){
      this.$request.get_id(this.params['id']).subscribe(res => {
        this.$request = res[0]
      })
    }

  }

}
