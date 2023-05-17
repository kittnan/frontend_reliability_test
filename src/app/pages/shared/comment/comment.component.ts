import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: any = []
  constructor() { }

  ngOnInit(): void {
    console.log(this.comment);
    console.log(typeof this.comment);
  }
  validTypeString() {
    return typeof this.comment === 'string'
  }

}
