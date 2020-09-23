import { systemSettings } from "./../../../../app-config";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {AuthService }from "../../../../authentication/services/auth.service"
import { MasterAIService } from "../../services/master-ai.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.css"]
})
export class ProgressComponent implements OnInit {
  InProgressDialogIsloading = true;
  isMyTask=false;
  @Input() AIToView:any;
  task:any={}
  constructor(
    private authService:AuthService,
    private MasterAIService :MasterAIService,
    private router:Router
  ) {}

  ngOnInit() {
    console.log("curent user",this.authService.currentUser)
    this.MasterAIService.getTaskByAICode(this.AIToView).subscribe((response)=>{
      this.task=response;
      console.log("task inside progress",this.task)
      if (
        this.task.Task_AssignTo_Employee_Code ==
        this.authService.currentUser.User_Employee_ID 
      ) {
        this.isMyTask = true;
      }
      if (this.task.Task_ActionTypeName == "Edit") {
        this.task.Task_ActionTypeName = "Edit AI Clinical Data";
      } else if (this.task.Task_ActionTypeName == "Review") {
        this.task.Task_ActionTypeName = "Review AI Clinical Data";
      } else if (this.task.Task_ActionTypeName == "Grammer Review") {
        this.task.Task_ActionTypeName = "Grammer Review AI Clinical Data";
      } else if (this.task.Task_ActionTypeName == "Publish") {
        this.task.Task_ActionTypeName = "Publish AI Clinical Data";
      }
      this.InProgressDialogIsloading = false;
    })
   
  }

   openTask  (){
    console.log("task opened")
    if(this.task.Task_ActionTypeName.includes('Edit') ){
        this.router.navigate([`/ai/master-ai-edit-clinical-data/${this.task.Task_Title}`], { 
          queryParams: {
              Task_Title: this.task.Task_Title,
              revisionid: this.task.Task_ActionDetails_Code,
              taskid: this.task.Task_Code,
              aicode: this.task.Task_RelatedTo_Code       
          }
      });
    }
    else if(this.task.Task_ActionTypeName.includes('Review') ){
        this.router.navigate([`/ai/master-ai-review-clinical-data/${this.task.Task_Title}`], { queryParams: {
                
          Task_Title:  this.task.Task_Title,
          revisionid:  this.task.Task_ActionDetails_Code,
          taskid:  this.task.Task_Code,
          aicode:  this.task.Task_RelatedTo_Code
          
  }});
    }
    else if(this.task.Task_ActionTypeName.includes('Grammer Review') ){

        this.router.navigate([`/ai/master-ai-grammer-clinical-data/${this.task.Task_Title}`], { queryParams: {
                
          Task_Title: this.task.Task_Title,
          revisionid: this.task.Task_ActionDetails_Code,
          taskid: this.task.Task_Code,
          aicode: this.task.Task_RelatedTo_Code
          
  }});
    }
    else if(this.task.Task_ActionTypeName.includes('Publish') ){
        this.router.navigate([`/ai/master-ai-publish-clinical-data/${this.task.Task_Title}`], { queryParams: {
                
          Task_Title: this.task.Task_Title,
          revisionid: this.task.Task_ActionDetails_Code,
          taskid: this.task.Task_Code,
          aicode: this.task.Task_RelatedTo_Code
          
  }});
    }
}

}
