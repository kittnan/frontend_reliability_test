import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-condition',
  templateUrl: './dialog-condition.component.html',
  styleUrls: ['./dialog-condition.component.scss']
})
export class DialogConditionComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.data = 'okokok'
  }

  foo(){
    
  }

}
