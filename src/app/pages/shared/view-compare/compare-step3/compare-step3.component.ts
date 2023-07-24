import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-step3',
  templateUrl: './compare-step3.component.html',
  styleUrls: ['./compare-step3.component.scss']
})
export class CompareStep3Component implements OnInit {
  @Input() formRevise: any = null
  @Input() form: any = null
  step3: any = null
  constructor() { }

  ngOnInit(): void {
    this.step3 = this.formRevise.step3
  }
  handleLabelColor(item: any, index: number) {
    const a = item;
    const b = this.form['step3']['data'][index].checked
    if (a == b) return ''
    return 'text-red'
  }
  handleLabelColor2(item: any, index: number, index2: number) {
    const a = item;
    const b = this.form['step3']['data'][index]['list'][index2].checked
    if (a == b) return ''
    return 'text-red'
  }

}
