import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  
   title;
   Message;
  constructor(
    private dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    this.title = this.data.title;
  }
  
  onSubmit() {
      this.onClose("submit");  
  }
  onClose(typeOfClosing) {
    this.dialogRef.close({Message:this.Message,typeOfClosing:typeOfClosing});
  }

}
