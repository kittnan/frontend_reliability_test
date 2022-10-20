import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MasterHttpService } from 'src/app/http/master-http.service';

@Component({
  selector: 'app-testing-condition-table',
  templateUrl: './testing-condition-table.component.html',
  styleUrls: ['./testing-condition-table.component.scss']
})
export class TestingConditionTableComponent implements OnInit {

  @Input() data: any
  @Output() dataChange = new EventEmitter();

  displayedColumns: string[] = ['item', 'condition', 'operate','inspection', 'timeInspection','timeReport','sampleNo','qty'];

  ngOnInit(): void {
  }



}
