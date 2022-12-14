import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MasterHttpService } from 'src/app/http/master-http.service';

export interface FilesForm {
  name: string;
  updated: Date;
  size: number
}
export interface ModelNo {
  modelNo: string;
  modelName: string;
  type: string;
  customer: string;
}
export interface Department {
  name: string;
}
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  corporate: any[] = [
    {
      name: 'AMT',
      value: 'amt'
    },
    {
      name: 'DST',
      value: 'dst'
    }
  ]

  models: ModelNo[] = []
  departments: Department[] = []
  files: File[] = []
  disable: boolean = true
  @Input() step1: any
  @Output() step1Change = new EventEmitter<any>();
  constructor(
    private _master: MasterHttpService
  ) { }

  ngOnInit(): void {
    // this._master.getModelMaster().subscribe(res => this.models = res)
    // this._master.getDepartmentMaster().subscribe(res => this.departments = res)
    this.files = this.step1.files
  }
  onClickViewFile(file: any) {
       (file);
      window.open(file.path, '_blank')
  }

}
