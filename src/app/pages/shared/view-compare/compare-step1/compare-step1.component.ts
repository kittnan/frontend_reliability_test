import { Component, Input, OnInit } from '@angular/core';
import { RequestHttpService } from 'src/app/http/request-http.service';
import { ModelNo, Department } from '../../views/step1/step1.component';

@Component({
  selector: 'app-compare-step1',
  templateUrl: './compare-step1.component.html',
  styleUrls: ['./compare-step1.component.scss']
})
export class CompareStep1Component implements OnInit {

  @Input() formRevise: any = null
  @Input() form: any = null

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
  step1: any = null
  constructor(
    private $request: RequestHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log(this.formRevise, this.form);
    this.step1 = this.formRevise.step1
  }
  onClickViewFile(file: any) {
    (file);
    window.open(file.path, '_blank')
  }
  handleLabelColor(item: any, key: string) {
    const a = item;
    const b = this.form['step1'][key]
    if (a == b) return ''
    return 'text-red'
  }
}
