import { CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { HomeServiceService } from '../../home/home-service.service';
import { RequestSheetService } from '../request-sheet.service';

@Component({
  selector: 'app-step3-testing-type-form',
  templateUrl: './step3-testing-type-form.component.html',
  styleUrls: ['./step3-testing-type-form.component.scss']
})
export class Step3TestingTypeFormComponent implements OnInit {

 
 
  @Input() testingType: any;
  @Output() testingTypeChange = new EventEmitter();
  testingTypeMenu: any = []

  constructor(
    private _loading: NgxUiLoaderService,
    private _homeService: HomeServiceService,
    private _stepper: CdkStepper,
    private route: ActivatedRoute,
    private _masterHttp: MasterHttpService,
    private _requestSheet: RequestSheetService
  ) { }

  async ngOnInit(): Promise<void> {
    const resTestingType = await this._masterHttp.getTestingTypeMaster().toPromise();
    const resultMap = await this._requestSheet.setTestingTypeList(resTestingType)
    this.testingTypeMenu = resultMap;
  }
  onNext() {
    this.testingTypeChange.emit(this.testingTypeMenu)
    this._stepper.next();
  }

}
