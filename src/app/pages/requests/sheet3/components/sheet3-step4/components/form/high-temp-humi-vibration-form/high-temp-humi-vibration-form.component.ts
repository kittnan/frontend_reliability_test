import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestingConditionForm } from 'src/app/interface/testingConditionForm';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-high-temp-humi-vibration-form',
  templateUrl: './high-temp-humi-vibration-form.component.html',
  styleUrls: ['./high-temp-humi-vibration-form.component.scss'],
})
export class HighTempHumiVibrationFormComponent implements OnInit {
  @Input() data: any;
  @Output() dataChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();

  form: any = {
    highTemp: {
      temp: '',
      tempVar: '',
    },
    operate: {
      text: 'operate',
      value: false,
    },
    sample: '',
    qty: '',
    inspection: [0],
    report: [0],
    humi: '',
    frequency: {
      high: '',
      low: '',
    },
    acceleration: '',
    time: '',
    cycle: '',
    direction: {
      x: '0',
      y: '0',
      z: '0',
    },
  };
  report: boolean = false;
  roomTemp: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.form = { ...this.data };
    if (this.form?.report?.length > 0) {
      this.report = true;
    }
  }
  emit(e: any) {
    this.form = { ...this.form, ...e };
    this.dataChange.emit(this.form);
  }
  handleReport() {
    if (!this.report) {
      this.form.report = [];
      this.dataChange.emit(this.form);
      Swal.fire({
        title: 'Selected No Report',
        icon: 'success',
        allowOutsideClick: false,
      });
    } else {
      this.form.report = [0];
      this.dataChange.emit(this.form);
      Swal.fire({
        title: 'Selected Report',
        icon: 'success',
        allowOutsideClick: false,
      });
    }
  }
}
