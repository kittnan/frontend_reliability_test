import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: any = null
  newComment: any = null
  constructor() { }

  ngOnInit(): void {
    if (this.comment) {
      this.customText(this.comment)
    }
  }

  customText(comment: any[]) {
    const filtered = comment.filter(a => a)
    const split = filtered.map((c: string) => {
      return c.split('->')
    })
    this.newComment = split
  }

  validTypeString() {
    if (typeof this.comment === 'string') return true
    return false
  }

}
