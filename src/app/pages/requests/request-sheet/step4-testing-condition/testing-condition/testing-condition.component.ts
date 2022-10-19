import { Component, OnInit, ViewChild } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { TempFormService } from './formComponent/temp-form-component/temp-form.service';
import {MatAccordion} from '@angular/material/expansion';

interface ConditionListForm {
  name: string,
  key: number
}
@Component({
  selector: 'app-testing-condition',
  templateUrl: './testing-condition.component.html',
  styleUrls: ['./testing-condition.component.scss']
})
export class TestingConditionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  conditionList: ConditionListForm[] = [
    {
      name: 'High Temperature',
      key: 1
    },
    {
      name: 'High Temperature & Humidity',
      key: 2
    },
    {
      name: 'High Temperature & Humidity & Vibration',
      key: 3
    },
    {
      name: 'Low Temperature',
      key: 4
    },
    {
      name: 'High & Low',
      key: 5
    },
    {
      name: 'Heat Shock',
      key: 6
    },

  ]
  selected: any = 0;
  conditions: any[] = [];
  constructor(
    private $tempForm: TempFormService
  ) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.conditions.push({ ...this.selected, data: null })
    setTimeout(() => {
      this.selected = 0;
    }, 100);
    
  }

  foo() {
    console.log(this.conditions);
    // const dood = this.$tempForm.getTempForm()
    // console.log(dood);

  }


  onDelete(item: any) {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.conditions = this.conditions.filter(c => c != this.conditions[item])
      }
    })

  }

}
