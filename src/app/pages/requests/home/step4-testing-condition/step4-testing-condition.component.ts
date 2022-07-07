import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-step4-testing-condition',
  templateUrl: './step4-testing-condition.component.html',
  styleUrls: ['./step4-testing-condition.component.scss']
})
export class Step4TestingConditionComponent implements OnInit {

  userRequest = new FormControl('', Validators.required)
  constructor(
    private _homeService: HomeServiceService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const step4 = {
      userRequest: {
        name: this.userRequest.value,
        status: true,
        time: new Date()
      },
      userApprove: {
        name: '',
        status: false,
        time: ''
      }
    }
    let result = this._homeService.getFormAll()
    result.step4 = step4
    console.log(result);

  }

}
