import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material";
import * as moment from "moment";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { systemSettings } from "../../../app-config";
import { PageTitleService } from "../../../services/page-title.service";
import { MasterAIEditClinicalDataService } from "../services/master-ai-clinical-data.service";
import { NotificationsService } from "../../sys-setup/services/notifications.service";
import { debug } from "util";
import { AuthService } from "./../../../authentication/services/auth.service";
import { CommentComponent } from '../comment/comment.component';
@Component({
  selector: 'app-master-ai-review-clinical-data',
  templateUrl: './master-ai-review-clinical-data.component.html',
  styleUrls: ['./master-ai-review-clinical-data.component.css']
})
export class MasterAiReviewClinicalDataComponent implements OnInit {
  actionisLoading = false;
  isFinished = false;
  isBrokenTask:any;
  navTab: string = "administration";
  SelectedAdminItem = "Administration";
  SelectedInteractionItem = "nothing";
  AdministrationMenueItems : any;
  GeneralMenueItems = [];
  InteractionMenuItems: any;
  SelectedGeneralParentItem = "nothing";
  SelectedGeneralItem = "nothing";
  noDataHTML =systemSettings.noDataHTML;
  AIName: string;
  queryParams: object = {};
  aiToEdit: any = "";
  allLinks: any = "";

  PregnancyCategories: any = [];
  BreastFeedingCategories: any = [];
  ClinicalData: any = {};
  InterActionFood: any = [];
  InterActionAI: any = [];
  InterActionLabTest: any = [];
  InterActionHerbs: any = [];
  InterActionAlcohol: any = [];

  DosingListComp: any = "";
  DosingAgeList: any = "";
  DosingAgeGgroupList: any = "";
  DosingAgeGgroupObjectList: any = "";
  DosingAdult: any = "";
  DosingGeriatric: any = "";
  DosingRenalImpairmentAdult: any = "";
  DosingHepaticImpairmentAdult: any = "";
  DosingPediatric: any = "";
  DosingRenalImpairmentPediatric: any = "";
  DosingHepaticImpairmentPediatric: any = "";
  url = "";
  AIMasterRevision_EditedBy_Employee_ID:any;
  EditorConfiguration = {
    height: "600px"
  };
  InterAction: any;
  BreastFeedingCategory: any;
  PregnancyCategory: any;
  FinsheMessage: string;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private EditClinicalDataService: MasterAIEditClinicalDataService,
    private router: Router,
    private notificationService: NotificationsService,
    private PageTitle: PageTitleService,
    private authService: AuthService
  ) {
    this.url = router.url;
  }

  changeSelectedAdminItem(SelectedAdminItem) {
    this.SelectedAdminItem = SelectedAdminItem;
  }
  changeSelectedInteractionItem(sSelectedInteractionItem) {
    this.SelectedInteractionItem = sSelectedInteractionItem;
  }

  generalPrimaryItemChanged(SelectedGeneralPrimaryItem) {
    const el = document.querySelector(".taskl-list-item-active");
    if (el) el.classList.remove("taskl-list-item-active");
    const NewEl = document.querySelector(
      "#primary" + SelectedGeneralPrimaryItem
    );
    NewEl.classList.add("taskl-list-item-active");
    this.SelectedGeneralItem = SelectedGeneralPrimaryItem;
    this.SelectedGeneralParentItem = "nothing";
  }
  generalChildItemChanged(SlectedGeneralChildItem) {
    const el = document.querySelector("#child" + this.SelectedGeneralItem);
    if (el) el.classList.remove("taskl-list-item-active");
    const newel = document.querySelector("#child" + SlectedGeneralChildItem);
    if (newel) newel.classList.add("taskl-list-item-active");
    this.SelectedGeneralItem = SlectedGeneralChildItem;
  }
  generalParentItemChanged(SelectedGeneralParentItem) {
    const el = document.querySelector(".taskl-list-item-active");
    if (el) el.classList.remove("taskl-list-item-active");
    this.SelectedGeneralParentItem = SelectedGeneralParentItem;
    const NewEl = document.querySelector("#parent" + SelectedGeneralParentItem);
    NewEl.classList.add("taskl-list-item-active");
  }

  ngOnInit() {
    this.PageTitle.ChangePageTitle(this.route.snapshot.paramMap.get("ainame"), 'Master AI - Grammer Review Clinical Data');
    this.queryParams["Task_Title"] = this.route.snapshot.queryParamMap.get(
      "Task_Title"
    );
    this.queryParams["revisionid"] = this.route.snapshot.queryParamMap.get(
      "revisionid"
    );
    this.queryParams["taskid"] = this.route.snapshot.queryParamMap.get(
      "taskid"
    );
    this.queryParams["aicode"] = this.route.snapshot.queryParamMap.get(
      "aicode"
    );
    this.EditClinicalDataService.checkTask(this.queryParams["taskid"],this.authService.currentUser.User_Code).subscribe((dataFromService:any)=>{
      if(dataFromService){
        this.EditClinicalDataService.searchAIByID(this.queryParams["aicode"]).subscribe((response: any) => {
          this.aiToEdit = response.ai;
          this.PageTitle.ChangePageTitle(
            this.route.snapshot.paramMap.get("ainame") +
              " (" + this.aiToEdit.AI_ATC_Code +  ")"
              ,'Master AI - Review Clinical Data');
          this.EditClinicalDataService.getAIMasterFieldStructure().subscribe((response: any) => {
            this.InteractionMenuItems = response.filter(function(obj) {
              return obj.id == "Interactions";
            });
            this.InteractionMenuItems = this.InteractionMenuItems[0];
            this.AdministrationMenueItems = response[0];
            this.GeneralMenueItems = response.splice(1, response.length);
            this.GeneralMenueItems = this.GeneralMenueItems.filter(function(obj) {
              return obj.id !== "Interactions" && obj.id !== "Dosages";
            });
            this.EditClinicalDataService.getAIRevision(this.queryParams["aicode"]).subscribe(response => {
              console.log("response ai revision", response);
              this.ClinicalData = response[0];
              if(response[0].AIBreastFeedingCategory[0])
                this.BreastFeedingCategory = response[0].AIBreastFeedingCategory[0].BreastFeeding_Name;
              else
                this.BreastFeedingCategory = "Category Not Selected !";
              if(response[0].AIPregnancyCategory[0])
                this.PregnancyCategory = response[0].AIPregnancyCategory[0].Pregnancy_Name;
              else
                this.PregnancyCategory = "Category Not Selected !";
              this.AIMasterRevision_EditedBy_Employee_ID=this.ClinicalData.AIMasterRevision_EditedBy_Employee_ID
              this.initGetAIInteractions()
            
              //
              this.DosingListComp = this.ClinicalData.AIMasterRevision_Dosing;
              this.DosingListComp.forEach((part, index, Dosinglist) => {
                this.DosingListComp[
                  index
                ].Dosing_UsageAge_Name = this.ClinicalData.MasterAIRevisionDosingUsageAge[
                  index
                ].UsageAge_Name;
                this.DosingListComp[
                  index
                ].Dosing_MedicalCondition_Name = this.ClinicalData.MasterAIRevisionDosingMedicalCondition[
                  index
                ].MedicalCondition_Name;
                this.DosingListComp[
                  index
                ].Dosing_MedicalCondition_ICD10 = this.ClinicalData.MasterAIRevisionDosingMedicalCondition[
                  index
                ].MedicalCondition_ICD10;
                this.DosingListComp[
                  index
                ].Dosing_MedicalCondition_ICD9 = this.ClinicalData.MasterAIRevisionDosingMedicalCondition[
                  index
                ].MedicalCondition_ICD9;
                this.DosingListComp[
                  index
                ].Dosing_UsageDoseType_Name = this.ClinicalData.MasterAIRevisionDosingUsageDoseType[
                  index
                ].UsageDoseType_Name;
                this.DosingListComp[
                  index
                ].Dosing_UsageDoseUnit_Name = this.ClinicalData.MasterAIRevisionDosingUsageDoseUnit[
                  index
                ].UsageDoseUnit_Name;
                this.DosingListComp[
                  index
                ].Dosing_Route_Name = this.ClinicalData.MasterAIRevisionDosingUsageRoute[
                  index
                ].Route_Name;
                this.DosingListComp[
                  index
                ].Dosing_Form_Name = this.ClinicalData.MasterAIRevisionDosingUsageForm[
                  index
                ].Form_Name;
                this.DosingListComp[
                  index
                ].Dosing_UsageFrequenIntervalUnit_Name = this.ClinicalData.MasterAIRevisionDosingUsageFrequenIntervalUnit[
                  index
                ].UsageFrequenIntervalUnit_Name;
              });
              this.DosingAgeList = [];
              this.DosingListComp.forEach((part, index, DosingItem) => {
                this.DosingAgeList.push(DosingItem[index].Dosing_UsageAge_Name);
              });
              this.DosingAgeGgroupList = this.uniquearray(this.DosingAgeList);
              console.log("DosingAgeGgroupList", this.DosingAgeGgroupList);
              this.DosingAgeGgroupObjectList = [];
              this.DosingAgeGgroupList.forEach((part, index, GroupsList) => {
                this.DosingAgeGgroupObjectList[index] = {
                  name: GroupsList[index]
                };
              });
              this.DosingAgeGgroupObjectList.forEach(
                (part, index, GroupsOpjectList) => {
                  this.DosingAgeGgroupObjectList[index].DosingDetails = [];
                }
              );
              this.DosingListComp.forEach((part, index, Dosinglist) => {
                var a = this.DosingAgeGgroupList.indexOf(
                  Dosinglist[index].Dosing_UsageAge_Name
                );
                if (a >= 0) {
                  this.DosingAgeGgroupObjectList[a].DosingDetails.push(
                    this.DosingListComp[index]
                  );
                }
              });
              this.DosingAdult = [];
              this.DosingGeriatric = [];
              this.DosingRenalImpairmentAdult = [];
              this.DosingHepaticImpairmentAdult = [];
              this.DosingPediatric = [];
              this.DosingRenalImpairmentPediatric = [];
              this.DosingHepaticImpairmentPediatric = [];
              this.DosingAgeGgroupObjectList.forEach((part, index, DosingGroup) => {
                if (part.name == "Adult") this.DosingAdult = part;
                else if (part.name == "Geriatric") this.DosingGeriatric = part;
                else if (part.name == "Renal Impairment (Adult)")
                  this.DosingRenalImpairmentAdult = part;
                else if (part.name == "Hepatic Impairment (Adult)")
                  this.DosingHepaticImpairmentAdult = part;
                else if (part.name == "Pediatric") this.DosingPediatric = part;
                else if (part.name == "Renal Impairment (Pediatric)")
                  this.DosingRenalImpairmentPediatric = part;
                else if (part.name == "Hepatic Impairment (Pediatric)")
                  this.DosingHepaticImpairmentPediatric = part;
              });
            });

          });
        });
      }
      else{
        this.isBrokenTask = true;
      }
    })
    
    
    
    
  }
  initGetAIInteractions(){
    this.InterActionFood=[];
    this.InterActionAI=[];
    this.InterActionAlcohol=[];
    this.InterActionLabTest=[];
    this.InterActionHerbs=[]
  this.EditClinicalDataService.getAIInteraction({
    InteractionRevision_Orignal_Code: this.queryParams["aicode"]
  }).subscribe((response: any) => {
    console.log("response", response);
    this.InterAction = response[0];
    console.log("this.InterAction", this.InterAction);
    this.InterAction.forEach(element => {
      if (element.InteractionRevision_Food_Code) {
        this.InterActionFood.push(element);
      } else if (element.InteractionRevision_AI_Code) {
        this.InterActionAI.push(element);
      } else if (element.InteractionRevision_Alcohol_Code) {
        this.InterActionAlcohol.push(element);
      }else if(element.InteractionRevision_LabTest_Code){
        this.InterActionLabTest.push(element)
      }else if(element.InteractionRevision_Herbs_Code){
        this.InterActionHerbs.push(element)
      }
    });
    console.log("this.InterActionFood", this.InterActionFood);
    console.log("this.InterActionAI", this.InterActionAI);
    console.log("this.InterActionAlcohol", this.InterActionAlcohol);
    console.log("this.InterActionLabTest",this.InterActionLabTest);
    console.log("this.InterActionHerbs",this.InterActionHerbs);
  });
}

  sendTaskToGrammer() {
    this.actionisLoading = true;
    const dataToSend={
      task_id:parseInt(this.queryParams["taskid"]) ,
      name: this.queryParams["Task_Title"],
      ai_revision_id:parseInt(this.queryParams["revisionid"]) ,
      user_id:this.authService.currentUser.User_Code,
      ai_id: parseInt(this.queryParams["aicode"])
    }
    this.EditClinicalDataService.AddTaskAIToGrammer(dataToSend).subscribe(
      (response: boolean) => {
        if (response){
          this.FinsheMessage = "Data Sent to Grammer Reviewer"
          this.isFinished = true;
          this.notificationService.success("Data Sent to Grammer Reviewer Successfully");
          this.actionisLoading = false;
        }
        else {
          this.notificationService.failed("unFortunately,Data couldn't be send");
          this.actionisLoading = false;
        }
    });
  }
  returnTaskToEditor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Return Task To Editor" };
    dialogConfig.disableClose=true
    let dialogRef=this.dialog.open(CommentComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      console.log("data",data)
      //closing model happens for 2 reasons,first press close button,second press submit button
      if(data.typeOfClosing == "submit"){
        this.actionisLoading = true;
        const dataToSend={
          taskid:parseInt(this.queryParams["taskid"]) ,
          name: this.queryParams["Task_Title"],
          revisionid:parseInt(this.queryParams["revisionid"]) ,
          userID:this.authService.currentUser.User_Code,
          aicode: parseInt(this.queryParams["aicode"]),
          SenderRoleType:"Reviewer",
          EditorID:this.AIMasterRevision_EditedBy_Employee_ID,
          Message:data.Message || ""
        }
        console.log("dataToSend",dataToSend)
        this.EditClinicalDataService.ReturnTaskAIToEditor(dataToSend).subscribe(
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
  
  uniquearray(origArr) {
    var newArr = [],
      origLen = origArr.length,
      found,
      x,
      y;

    for (x = 0; x < origLen; x++) {
      found = undefined;
      for (y = 0; y < newArr.length; y++) {
        if (origArr[x] === newArr[y]) {
          found = true;
          break;
        }
      }
      if (!found) {
        newArr.push(origArr[x]);
      }
    }
    return newArr;
  }
  changeNavTab(tab: string) {
    this.navTab = tab;
  }
  ngOnDestroy() {}
  getEmployeeName(employeeID,commentType){
    console.log("Look for Employees");
    console.log(this.ClinicalData.FromEmployee);

    if(commentType == 1){
      var EmployeeFrom = 
      this.ClinicalData.FromEmployee.filter(obj => {
        return obj.Employee_Code === employeeID;
      })
      return EmployeeFrom[0].Employee_Name
    }
    else{
      var EmployeeTo = 
      this.ClinicalData.ToEmployee.filter(obj => {
        return obj.Employee_Code === employeeID;
      })
      return EmployeeTo[0].Employee_Name
    }
  }
  calculateTime(DateToCalculate){
    console.log("time:")
    console.log(moment(DateToCalculate).startOf("hour").fromNow())
    return moment(DateToCalculate).startOf("hour").fromNow();
  }
}
