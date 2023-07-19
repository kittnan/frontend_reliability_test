import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-revises-form',
  templateUrl: './revises-form.component.html',
  styleUrls: ['./revises-form.component.scss']
})
export class RevisesFormComponent implements OnInit {

  @Input() functionChamber: any = null
  @Input() step1: any = null
  @Input() step2: any = null
  @Input() step3: any = null
  @Input() data: any = null
  @Input() hide: any = false
  @Output() dataExport: EventEmitter<any> = new EventEmitter<any>
  mainTask: any = null
  subtasks: any = [
    {
      completed: false,
      color: 'primary',
      name: 'temp',
    },
    {
      completed: false,
      color: 'primary',
      name: 'operate',
    },
    {
      completed: false,
      color: 'primary',
      name: 'sampleNo',
    },
    {
      completed: false,
      color: 'primary',
      name: 'qty',
    },
    {
      completed: false,
      color: 'primary',
      name: 'inspectionTime',
    },
    {
      completed: false,
      color: 'primary',
      name: 'reportTime',
    },
  ]

  step1Form = new FormControl(null, Validators.required)
  step2Form = new FormControl(null, Validators.required)
  step3Form = new FormControl(null, Validators.required)

  constructor() { }

  ngOnInit(): void {
    this.step1Form.patchValue(this.step1)
    this.step2Form.patchValue(this.step2)
    this.step3Form.patchValue(this.step3)
    if (this.data) {
      this.mainTask = this.data
    } else {

      this.mainTask = this.functionChamber.map((a: any, i: number) => {
        return {
          ...a,
          completed: false,
          description: null,
          subtasks: this.subtasks.map((b: any) => {
            return {
              ...b,
              index: i
            }
          })
        }
      })
      this.mainTask.push({
        name: "Other",
        completed: false,
        description: null,
        subtasks: this.subtasks.map((b: any, i: number) => {
          return {
            ...b,
            index: i
          }
        })
      })
    }
  }
  emit() {
    this.dataExport.emit({
      data: this.mainTask,
      step1: this.step1Form.value,
      step2: this.step2Form.value,
      step3: this.step3Form.value
    })
  }

}
