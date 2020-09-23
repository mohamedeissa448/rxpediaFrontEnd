import { Component, OnInit } from '@angular/core';
import{ OriginalTNService } from "../services/original-tn.service"
import {  ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { NotificationsService } from "../../sys-setup/services/notifications.service";
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CommentComponent } from '../../ai/comment/comment.component';

@Component({
  selector: 'app-master-tn-review-original-data',
  templateUrl: './master-tn-review-original-data.component.html',
  styleUrls: ['./master-tn-review-original-data.component.css']
})
export class MasterTnReviewOriginalDataComponent implements OnInit {
  actionisLoading = false;
  isFinished = false;
  FinsheMessage: string;
  queryParams:any={}
  tnToReview:any={}
  constructor(private originalTNService:OriginalTNService,private route:ActivatedRoute,
    private authService:AuthService,private notificationService:NotificationsService,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.queryParams["Task_Title"] = this.route.snapshot.queryParamMap.get(
      "Task_Title"
    );
    this.queryParams["revisionid"] = this.route.snapshot.queryParamMap.get(
      "revisionid"
    );
    this.queryParams["taskid"] = this.route.snapshot.queryParamMap.get(
      "taskid"
    );
    this.queryParams["tncode"] = this.route.snapshot.queryParamMap.get(
      "tncode"
    );
    this.originalTNService.getTNRevisionByID({tn_revision_id: this.queryParams["revisionid"]}).subscribe((response)=>{
    console.log("response",response);
    this.tnToReview=response
    this.tnToReview.FullStrengthData =[]
    this.tnToReview.FullCountryData =[]
    console.log("before tnToReview",this.tnToReview)
    this.tnToReview.strength.forEach((element,index)=> {
        this.tnToReview.FullStrengthData.push({
              AIName: this.tnToReview.ActualAI[index].AI_Name,
              StrengthValue:this.tnToReview.TNRevision_Data_Strength[index].TN_Data_Strength_Value,
              StrengthUnitName: element.StrengthUnit_Name
        })
    });
    this.tnToReview.country.forEach((element,index)=>{
        this.tnToReview.FullCountryData.push({
               CountryName: element.Country_Name,
               CountryTNFullName: this.tnToReview.TNRevision_Country_Data[index].TN_Data_Country_FullName
            })
        });
        console.log("after tnToReview",this.tnToReview)
    })
  }
  ReturnToEditor(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Return Task To Editor" };
    dialogConfig.disableClose=true
    let dialogRef=this.dialog.open(CommentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      console.log("data",data)
      //closing model happens for 2 reasons,first pressing close button,second pressing submit button
      if(data.typeOfClosing == "submit"){
        this.actionisLoading = true;
        const dataToSend={
          taskid:parseInt(this.queryParams["taskid"]) ,
          name: this.queryParams["Task_Title"],
          TNRevision_Code:parseInt(this.queryParams["revisionid"]) ,
          userID:this.authService.currentUser.User_Code,
          TN_Code: parseInt(this.queryParams["tncode"]),
          EditorID:this.tnToReview.TNRevision_EditedBy_Employee_ID,
          SenderRoleType:"Reviewer",
          Message:data.Message || ""
        }
        console.log("dataToSend",dataToSend)
        this.originalTNService.ReturnTaskTNToEditor(dataToSend).subscribe(
          (response: boolean) => {
            if (response) {
              this.isFinished = true;
              this.notificationService.success("Data Sent To Editor Successfully");
              this.FinsheMessage = "Data Returned To Editor"
              this.actionisLoading = false;
            } else{
              this.actionisLoading = false;
              this.notificationService.failed(
                "unFortunately,Data unSent to its Editor!"
              );
            }
               
          }
        );
      }
    })
  }
  SubmitToPublisher(){
    this.actionisLoading = true;
    let dataToPublisher:any ={};
    dataToPublisher.task_id = this.queryParams["taskid"]
    dataToPublisher.TN_Name = this.tnToReview.TNRevision_Name;
    dataToPublisher.TNRevision_ReviewedBy_Employee_ID = this.authService.currentUser.User_Code;
    dataToPublisher.TNRevision_Code =this.queryParams["revisionid"];
    dataToPublisher.TN_Code = this.queryParams["tncode"];
    this.originalTNService.AddTNToPublisher(dataToPublisher).subscribe((status:any)=>{
      if(status == true){
        this.actionisLoading = false;
        this.FinsheMessage = "Data Sent to Publisher"
        this.isFinished = true;
        this.notificationService.success("TN Successfully Sent to Publisher");
      }else{
        this.actionisLoading = false;
        this.notificationService.failed("Something went wrong,Please try again later!");
      }
    })
                
  }

}
