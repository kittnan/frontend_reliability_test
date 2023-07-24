import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-step2',
  templateUrl: './compare-step2.component.html',
  styleUrls: ['./compare-step2.component.scss']
})
export class CompareStep2Component implements OnInit {
  @Input() formRevise: any = null
  @Input() form: any = null
  step2: any = null
  constructor() { }

  ngOnInit(): void {
    console.log(this.formRevise, this.form);
    this.step2 = this.formRevise.step2
  }
  handleLabelColor(item: any, key: string) {
    const a = item;
    const b = this.form['step2'][key]
    if (a == b) return ''
    return 'text-red'
  }
}
