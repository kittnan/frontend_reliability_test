import { CdkStepper } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { RequestSheetService } from '../request-sheet.service';
import { SetSubjectService } from '../set-subject.service';

@Component({
  selector: 'app-step3-testing-type-form',
  templateUrl: './step3-testing-type-form.component.html',
  styleUrls: ['./step3-testing-type-form.component.scss']
})
export class Step3TestingTypeFormComponent implements OnInit {



  @Input() step3: any;
  @Output() step3Change = new EventEmitter();
  testingTypeMenu: any = []

  constructor(
    private _loading: NgxUiLoaderService,
    private _setSubject: SetSubjectService,
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
    this._loading.start()
    this.step3Change.emit(this.testingTypeMenu)
    this._loading.stopAll();
    this._stepper.next();
  }
  onBack() {
    this._stepper.previous()
  }

}
