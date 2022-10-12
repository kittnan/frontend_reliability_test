import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';
import { MasterHttpService } from 'src/app/http/master-http.service';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';


interface TempForm {
  high: string,
  low: string,
  humidity: string,
  timeInspec: Array<any>,
  timeReport: Array<any>
}
@Component({
  selector: 'app-form-temp',
  templateUrl: './form-temp.component.html',
  styleUrls: ['./form-temp.component.scss']
})
export class FormTempComponent implements OnInit {

  form: TempForm = {
    high: '0',
    low: '0',
    humidity: '0',
    timeInspec: [],
    timeReport: []
  }
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();
  inputTemp: any = ''
  symbolList: any = [
    '±', '℃', '↔'
  ]

  inspectionTime: any[] = []
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  timeAll: any = ['100', '200'];
  timeInspecFiltered: any;
  timeInspec: any = [];
  timeInspecCtrl = new FormControl();
  @ViewChild('timeInspecInput') timeInspecInput!: ElementRef<HTMLInputElement>;


  timeReportFiltered: any
  timeReport: any = []
  timeReportCtrl = new FormControl()
  @ViewChild('timeReportInput') timeReportInput!: ElementRef<HTMLInputElement>;


  constructor(
    private _master: MasterHttpService
  ) {
    this.timeInspecFiltered = this.timeInspecCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterTimeInspec(fruit) : this.timeAll.slice())),
    );
    this.timeReportFiltered = this.timeReportCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterTimeInspec(fruit) : this.timeAll.slice())),
    );
  }

  ngOnInit(): void {
    // this.form = this.formInput
    this.getMaster();
  }

  async getMaster() {
    this.inspectionTime = await this._master.getIntervalMaster().toPromise();
    console.log(this.inspectionTime);

  }

  symbolHigh(symbol: string) {
    this.form.high += symbol;
  }
  symbolLow(symbol: string) {
    this.form.low += symbol;
  }
  symbolHumidity(symbol: string) {
    this.form.humidity += symbol;
  }


  addTimeInspec(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.form.timeInspec.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.timeInspecCtrl.setValue(null);
    this.emitChange();
  }

  removeTimeInspec(item: any) {
    const index = this.form.timeInspec.indexOf(item);
    if (index >= 0) {
      this.form.timeInspec.splice(index, 1);
    }
    this.emitChange();

  }

  selectedTimeInspec(event: MatAutocompleteSelectedEvent): void {
    this.form.timeInspec.push(event.option.viewValue);
    this.timeInspecInput.nativeElement.value = '';
    this.timeInspecCtrl.setValue(null);
    this.emitChange();

  }

  private _filterTimeInspec(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.timeAll.filter((item: any) => item.toLowerCase().includes(filterValue));
  }


  addTimeReport(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.form.timeReport.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.timeReportCtrl.setValue(null);
    this.emitChange();

  }

  removeTimeReport(item: any) {
    const index = this.form.timeReport.indexOf(item);
    if (index >= 0) {
      this.form.timeReport.splice(index, 1);
    }
    this.emitChange();
  }
  selectedTimeReport(event: MatAutocompleteSelectedEvent): void {
    this.form.timeReport.push(event.option.viewValue);
    this.timeReportInput.nativeElement.value = '';
    this.timeReportCtrl.setValue(null);
    this.emitChange();

  }

  emitChange() {
    this.formInputChange.emit(this.form)
  }

  // onSubmit() {
  //   console.log(this.form);

  //   this.formInputChange.emit(this.form)
  // }


}
