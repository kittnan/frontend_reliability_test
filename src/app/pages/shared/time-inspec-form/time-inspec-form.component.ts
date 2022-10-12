import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-time-inspec-form',
  templateUrl: './time-inspec-form.component.html',
  styleUrls: ['./time-inspec-form.component.scss']
})
export class TimeInspecFormComponent implements OnInit {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  timeList: any = [
    'Initial',
    '100',
    '200'
  ]
  timeFiltered: any = [];
  timeCtr = new FormControl();
  times: any[] = []
  @ViewChild('timeInput') timeInput!: ElementRef<HTMLInputElement>;

  @Input() title: any
  @Input() formInput: any
  @Output() formInputChange = new EventEmitter();

  constructor() {
    this.timeFiltered = this.timeCtr.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => (item ? this._filter(item) : this.timeList.slice()))
    )
  }

  ngOnInit(): void {
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.timeList.filter((item: any) => item.toLowerCase().includes(filterValue))
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.times.push(value);
    }
    event.chipInput!.clear();

    this.timeCtr.setValue(null);
    this.emitChange();
  }
  select(event: MatAutocompleteSelectedEvent): void {
    this.times.push(event.option.viewValue);
    this.timeInput.nativeElement.value = '';
    this.timeCtr.setValue(null);
    this.emitChange();

  }
  remove(item: any) {
    const index = this.times.indexOf(item);
    if (index >= 0) {
      this.times.splice(index, 1);
    }
    this.emitChange();
  }
  emitChange() {
    this.formInputChange.emit(this.times)
  }

}
