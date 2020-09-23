import { element } from "protractor";
import _ from "lodash";
import * as moment from "moment";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { systemSettings } from '../../../app-config'
import { InteractionAddFormComponent } from "./interaction-add-form/interaction-add-form.component";
import { ConfirmationDialogService } from '../../../layout/confirmation-dialog/confirmation-dialog.service'
import { PageTitleService } from "../../../services/page-title.service";
import { MasterAIEditClinicalDataService } from "../services/master-ai-clinical-data.service";
import { NotificationsService } from "../../sys-setup/services/notifications.service";
import { debug } from "util";
import { DosingAddFormComponent } from "./dosing-add-form/dosing-add-form.component";
import { InteractionEditFormComponent } from "./interaction-edit-form/interaction-edit-form.component";
import { AuthService } from "./../../../authentication/services/auth.service";
import { DosingEditFormComponent } from './dosing-edit-form/edit-dosing-form.component';
import { timeout } from 'rxjs/operators';

@Component({
  selector: "app-master-ai-edit-clinical-data",
  templateUrl: "./master-ai-edit-clinical-data.component.html",
  styleUrls: ["./master-ai-edit-clinical-data.component.css"]
})
export class MasterAIEditClinicalDataComponent implements OnInit, OnDestroy {
  actionisLoading = false;
  isFinished = false;
  navTab: string = "administration";
  isInteractionLoading = true;
  SelectedAdminItem = "nothing";
  SelectedInteractionItem = "nothing";
  SelectedDosingItem = "nothing"
  AdministrationMenueItems :any;
  GeneralMenueItems = [];
  InteractionMenuItems : any;
  SelectedGeneralParentItem = "nothing";
  SelectedGeneralItem = "nothing";
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
  DosingAgeList =  ["Adult Dosings", "Geriatric Dosings", "Pediatric Dosings", "Neonatal Dosings"];
  DosingAgeGgroupList: any = "";
  DosingAgeGgroupObjectList: any = "";
  DosingAdult: any = [];
  DosingPediatric: any = [];
  DosingGeriatric: any = [];
  DosingNeonatal: any = [];
  DosingRenalImpairmentAdult: any = "";
  DosingHepaticImpairmentAdult: any = "";
  DosingRenalImpairmentPediatric: any = "";
  DosingHepaticImpairmentPediatric: any = "";
  url = "";
  EditorConfiguration = systemSettings.tinyEditorConfiguration;

  InterAction: any;
  ClinicalDataIntialData: any;
  isDosingLoading = true;
  isBrokenTask:any;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private EditClinicalDataService: MasterAIEditClinicalDataService,
    private router: Router,
    private notificationService: NotificationsService,
    private PageTitle: PageTitleService,
    private authService: AuthService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.url = router.url;
    this.PageTitle.ChangePageTitle(this.route.snapshot.paramMap.get("ainame"), 'Master AI - Edit Clinical Data');
    
  }

  openAddInteractionWindow() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.data = {
      aicode: this.queryParams["aicode"],
      revisionid: parseInt(this.queryParams["revisionid"])
    };
    this.dialog.open(InteractionAddFormComponent, dialogConfig).afterClosed().subscribe(dataIsSaved => {
      if(dataIsSaved){
        this.isInteractionLoading = true;
        this.initGetAIInteractions();
      }
    });
  }
  
  dataHasChanged(){
    if(_.isEqual(this.ClinicalDataIntialData, this.ClinicalData)){
      return false;
    } 
    else{
      return true;   
    }
    
  }
  changeSelectedAdminItem(SelectedAdminItem) {
    this.SelectedAdminItem = SelectedAdminItem;
  }
  changeSelectedInteractionItem(sSelectedInteractionItem) {
    this.SelectedInteractionItem = sSelectedInteractionItem;
  }
  changeSelectedDosingItem(sSelectedDosingItem) {
    this.SelectedDosingItem = sSelectedDosingItem;
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
            " (" +
            this.aiToEdit.AI_ATC_Code +
            ")",'Master AI - Edit Clinical Data'
          );
          this.EditClinicalDataService.getAIMasterFieldStructure().subscribe((response: any) => {
            this.InteractionMenuItems = response.filter(function (obj) {
              return obj.id == "Interactions";
            });
            this.InteractionMenuItems = this.InteractionMenuItems[0];
            this.AdministrationMenueItems = response[0];
            this.GeneralMenueItems = response.splice(1, response.length);
            this.GeneralMenueItems = this.GeneralMenueItems.filter(function (obj) {
              return obj.id !== "Interactions" && obj.id !== "Dosages";
            });
            this.EditClinicalDataService.getPregnancy().subscribe(response => {
              this.PregnancyCategories = response;
              this.EditClinicalDataService.getBreastFeeding().subscribe(response => {
                this.BreastFeedingCategories = response;
                this.getRevisionData(true,true);
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
  getRevisionData(loadInteraction:boolean,loadDosing:boolean){
    this.EditClinicalDataService.getAIRevision(
      this.queryParams["aicode"]
    ).subscribe(response => {
      this.ClinicalData = response[0]
      this.ClinicalDataIntialData = _.cloneDeep(this.ClinicalData);
      if(loadDosing)
        this.processDosing(this.ClinicalDataIntialData);
      if(loadInteraction)
        this.initGetAIInteractions();
    });
  }
  getDosingData(){
    this.EditClinicalDataService.getAIDosing(
      this.queryParams["revisionid"]
    ).subscribe(response => {
      this.processDosing(response[0]);
    })
  }
  processDosing(DosingData){
    this.isDosingLoading = false;
    this.DosingAdult = [];
    this.DosingPediatric = [];
    this.DosingGeriatric = [];
    this.DosingNeonatal = [];
    DosingData.AIMasterRevision_Dosing.forEach((part, index) => {
      var DosingUsageAge =  DosingData.MasterAIRevisionDosingUsageAge.filter(obj => {
        return obj.UsageAge_Code === part.Dosing_UsageAge_Code;
      });
      part.Dosing_UsageAge_Name = DosingUsageAge[0].UsageAge_Name;
      var MedicalCondition =  DosingData.MasterAIRevisionDosingMedicalCondition.filter(obj => {
        return obj.MedicalCondition_Code === part.Dosing_MedicalCondition_Code;
      });
      part.Dosing_MedicalCondition_Name = MedicalCondition[0].MedicalCondition_Name;
      var DosingRoute =  DosingData.MasterAIRevisionDosingUsageRoute.filter(obj => {
        return obj.Route_Code === part.Dosing_Route_Code;
      });
      part.Dosing_Route_Name = DosingRoute[0].Route_Name;
      var Population =  DosingData.MasterAIRevisionPopulation.filter(obj => {
        return obj.Population_Code === part.Dosing_Population_Code;
      });
      part.Dosing_Population_Name = Population[0].Population_Name;
      if (part.Dosing_UsageAge_Code == 1)
        this.DosingAdult.push(part);
      else if (part.Dosing_UsageAge_Code == 2)
        this.DosingGeriatric.push(part)
      else if (part.Dosing_UsageAge_Code == 3)
        this.DosingPediatric.push(part)
      else if (part.Dosing_UsageAge_Code == 4)
        this.DosingNeonatal.push(part)
    });
  }
  initGetAIInteractions() {
    this.InterActionFood = [];
    this.InterActionAI = [];
    this.InterActionAlcohol = [];
    this.InterActionLabTest = [];
    this.InterActionHerbs = []
    this.EditClinicalDataService.getAIInteraction({
      InteractionRevision_Orignal_Code: this.queryParams["aicode"]
    }).subscribe((response: any) => {
      this.isInteractionLoading = false;
      this.InterAction = response[0];
      this.InterAction.forEach(element => {
        if (element.InteractionRevision_Food_Code) {
          this.InterActionFood.push(element);
        } else if (element.InteractionRevision_AI_Code) {
          this.InterActionAI.push(element);
        } else if (element.InteractionRevision_Alcohol_Code) {
          this.InterActionAlcohol.push(element);
        } else if (element.InteractionRevision_LabTest_Code) {
          this.InterActionLabTest.push(element)
        } else if (element.InteractionRevision_Herbs_Code) {
          this.InterActionHerbs.push(element)
        }
      });
    });
  }

  submitData() {
    this.actionisLoading = true;
    this.ClinicalData.row_id = this.queryParams["revisionid"];
    this.EditClinicalDataService.editAIRevision(this.ClinicalData).subscribe(
      (response: boolean) => {
        if (response){
          this.notificationService.success("Data Saved successfully");
          this.ClinicalDataIntialData = _.cloneDeep(this.ClinicalData);
          this.actionisLoading = false;
        }
        else {
          this.notificationService.failed("unFortunately,Data unSaved");
          this.actionisLoading = false;
        }

      }
    );
  }
  SubmitToReview() {
    this.actionisLoading = true;
    this.ClinicalData.row_id = this.queryParams["revisionid"];
    this.EditClinicalDataService.editAIRevision(this.ClinicalData).subscribe(
      (response: boolean) => {
        if (response) {
          this.notificationService.success("Data Saved successfully");
          this.EditClinicalDataService.SubmitToReview({
            task_id: parseInt(this.queryParams["taskid"]),
            name: this.ClinicalData.AIMasterRevision_Name,
            ai_revision_id: parseInt(this.queryParams["revisionid"]),
            user_id: this.authService.currentUser.User_Code,
            ai_id: parseInt(this.queryParams["aicode"]),
            row_id: parseInt(this.queryParams["revisionid"]),
          }).subscribe((response: boolean) => {
            if (response){
              this.notificationService.success(
                "Clinical Data Sent to Reviewer"
              );
              this.ClinicalDataIntialData = _.cloneDeep(this.ClinicalData);
              this.isFinished = true;
              this.actionisLoading = false;
            }
            else{
              this.actionisLoading = false;
              this.notificationService.failed(
                "Clinical Data Wasn't Sent to Reviewer!!"
              );
            }
              
          });
        } else{
          this.actionisLoading = false;
          this.notificationService.failed(
            "unFortunately,Data unSaved and not send to reviewer!"
          );
        }
      }
    );
  }
  interactionEdit(interactionDetail) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.data = {
      aicode: this.queryParams["aicode"],
      type: this.SelectedInteractionItem,
      revisionid: this.queryParams["revisionid"],
      interactionDetail: interactionDetail
    };
    const dialogRef = this.dialog.open(
      InteractionEditFormComponent,
      dialogConfig
    );
    dialogRef
      .afterClosed()
      .subscribe(dataIsSaved => {
        if(dataIsSaved){
          this.isInteractionLoading = true;
          this.initGetAIInteractions()
        }
      });
  }
  interactionDelete(interactionDetail, nameToDelete) {
    var dialogTitle = 'Delete Interaction';
    var confirmIntialMessage = 'Are You Sure you want to Delete ' + nameToDelete +' !?';
    this.confirmationDialogService.confirm(dialogTitle, confirmIntialMessage)
    .then((confirmed) => {
      if(confirmed){
        const dataToSend={
          InteractionRevision_Code: interactionDetail.InteractionRevision_Code
        } 
        this.EditClinicalDataService.DeleteMasterAIRevisionInteraction(dataToSend)
          .subscribe((response:any) => {
            if(response){
              this.notificationService.success("Interaction Deleted Successfully");
              this.isInteractionLoading = true;
              this.initGetAIInteractions()
            }else{
              this.notificationService.failed("Something went wrong,Please try again later!");
            }
        });
      }
    });
  }
  openAddDosingWindow() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.height = "95%";
    dialogConfig.data = {
      revisionid: parseInt(this.queryParams["revisionid"])
    };
    this.dialog.open(DosingAddFormComponent, dialogConfig).afterClosed().subscribe(dataIsSaved => {
      this.getDosingData();
      if(dataIsSaved){
        this.isDosingLoading = true;
        this.getDosingData();
      }
    });
  }
  dosingEdit(dosingDetail) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "95%";
    dialogConfig.height = "95%";
    dialogConfig.data = {
      dosingItem: dosingDetail,
      revisionid: parseInt(this.queryParams["revisionid"]),
      row_id: dosingDetail._id
    };
    const dialogRef = this.dialog.open(
      DosingEditFormComponent,
      dialogConfig
    );
    dialogRef
      .afterClosed()
      .subscribe(dataIsUpdated => {
        if(dataIsUpdated){
          this.isDosingLoading = true;
          this.getDosingData()
        }
      });
  }
  dosingDelete(dosingDetail) {
    var dialogTitle = 'Delete Dosing!';
    var confirmIntialMessage = 'Are You Sure you want to Delete ';
    this.confirmationDialogService.confirm(dialogTitle, 
      confirmIntialMessage + dosingDetail.Dosing_MedicalCondition_Name +' !?')
    .then((confirmed) => {
      if(confirmed){
        const dataToSend={
          AIMasterRevision_Code: this.queryParams["revisionid"],
          row_id:dosingDetail._id
        } 
        this.EditClinicalDataService.DeleteMasterAIRevisionDosing(dataToSend)
          .subscribe((response:any) => {
            if(response.message){
              this.notificationService.success("Dosing Deleted Successfully");
              this.isDosingLoading = true;
              this.getDosingData()
            }else{
              this.notificationService.failed("Something went wrong,Please try again later!");
            }
        });
      }
    });
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
  ngOnDestroy() { }
  getEmployeeName(employeeID,commentType){
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
    return moment(DateToCalculate).startOf("hour").fromNow();
  }
}



