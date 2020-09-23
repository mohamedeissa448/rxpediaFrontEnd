import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css']
})
export class ViewCommentsComponent implements OnInit {

  title;
  Message;
  employeesArray: any;
  commentsData: any;
 constructor(
   private dialogRef: MatDialogRef<ViewCommentsComponent>,
   @Inject(MAT_DIALOG_DATA) private data
 ) {}

 ngOnInit() {
   this.title = this.data.title;
   this.commentsData = this.data.commentsData;
 }
 
 onSubmit() {
     this.onClose("submit");  
 }
 onClose(typeOfClosing) {
   this.dialogRef.close({Message:this.Message,typeOfClosing:typeOfClosing});
 }

}
