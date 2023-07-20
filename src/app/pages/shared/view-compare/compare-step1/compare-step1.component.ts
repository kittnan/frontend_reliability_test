import { Component, Input, OnInit } from '@angular/core';
import { RequestHttpService } from 'src/app/http/request-http.service';

@Component({
  selector: 'app-compare-step1',
  templateUrl: './compare-step1.component.html',
  styleUrls: ['./compare-step1.component.scss']
})
export class CompareStep1Component implements OnInit {

  @Input() formRevise: any = null
  constructor(
    private $request: RequestHttpService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log(this.formRevise);
    const foo = await this.$request.get_id(this.formRevise.step1.requestId).toPromise()
    console.log("🚀 ~ foo:", foo)
  }

}
