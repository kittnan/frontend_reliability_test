import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heat-shock',
  templateUrl: './heat-shock.component.html',
  styleUrls: ['./heat-shock.component.scss'],
})
export class HeatShockComponent implements OnInit {
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  form: any = {
    lowTemp: {
      temp: '',
      tempVar: '',
    },
    highTemp: {
      temp: '',
      tempVar: '',
    },
    operate: {
      text: 'no-operate',
      value: false,
    },
    sample: '',
    qty: '',
    inspection: [0],
    report: [0],
    time: '',
    cycle: '',
  };

  report: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.data) {
      this.form = {
        ...this.data,
        operate: {
          text: 'no-operate',
          value: false,
        },
      };
      if (this.form?.report?.length > 0) {
        this.report = true;
      }
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
