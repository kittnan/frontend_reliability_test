import { OperateItemsHttpService } from './../../../http/operate-items-http.service';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-operate',
  templateUrl: './table-operate.component.html',
  styleUrls: ['./table-operate.component.scss']
})
export class TableOperateComponent implements OnInit {

  @Input() table: any
  constructor(
  ) { }

  ngOnInit(): void {

  }

}
