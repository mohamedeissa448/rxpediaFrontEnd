import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class AIViewComponent implements OnInit {
  message ={name:"from parent as name",id:3};
  aicode:any=0;
  constructor( private dialogRef: MatDialogRef<AIViewComponent>,@Inject(MAT_DIALOG_DATA) data){
    console.log(data.aicode)
    this['aicode'] = data.aicode;
  }
  SelectedTab: string = "LiveData";
  ngOnInit() {
  }
  changeNavTab(tab: string) {
    this.SelectedTab = tab;
  }
  closeForm(){
    this.dialogRef.close();
  }
}
