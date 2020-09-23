import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { EditAIMCService } from "../services/edit-ai-mc.service";
import { NotificationsService } from "../../sys-setup/services/notifications.service";
@Component({
  selector: "app-edit-ai-clinical",
  templateUrl: "./edit-ai-clinical.component.html",
  styleUrls: ["./edit-ai-clinical.component.css"]
})
export class EditAiClinicalComponent implements OnInit {
  navTab;
  queryParams: object = {};
  aiToEdit: any = "";
  allLinks: any = "";
  Administration: any = "";
  restLinks: any = [];
  PregnancyCategories: any = [];
  BreastFeedingCategories: any = [];
  ClinicalData: any = {};
  InterActionFood: any = "";
  InterActionAI: any = "";
  InterActionLabTest: any = "";
  InterActionHerbs: any = "";
  InterActionAlcohol: any = "";
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
  constructor(
    private route: ActivatedRoute,
    private EditAIMCService: EditAIMCService,
    private router: Router,
    private notificationService: NotificationsService
  ) {
    this.url = router.url;
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
    console.log("aicode", this.queryParams["aicode"]);
    this.EditAIMCService.searchAIByID(this.queryParams["aicode"]).subscribe(
      (response: any) => {
        console.log("response", response);
        this.aiToEdit = response.ai;
      }
    );
    this.EditAIMCService.getAIMasterFieldStructure().subscribe(
      (response: any) => {
        console.log("response", response);
        this.allLinks = response;
        this.allLinks.forEach(element => {
          if (element.title == "Administration") this.Administration = element;
          else this.restLinks.push(element);
        });
      }
    );
    this.EditAIMCService.getPregnancy().subscribe(response => {
      console.log("response PregnancyCategories", response);
      this.PregnancyCategories = response;
    });
    this.EditAIMCService.getBreastFeeding().subscribe(response => {
      console.log("response BreastFeedingCategories", response);
      this.BreastFeedingCategories = response;
    });
    this.EditAIMCService.getAIRevision(this.queryParams["aicode"]).subscribe(
      response => {
        console.log("response ai revision", response);
        this.ClinicalData = response[0];
        console.log("clinical data", this.ClinicalData);
        this.InterActionFood = this.ClinicalData.AIMasterRevision_Interaction_Food;
        if (this.InterActionFood[0])
          this.InterActionFood.forEach((FoodItem, index) => {
            FoodItem.Severity_Name = this.ClinicalData.SeverityFood[
              index
            ].InteractionSeverity_Name;
            FoodItem.Level_Name = this.ClinicalData.LevelFood[
              index
            ].InteractionLevel_Name;
            FoodItem.Reliability_Name = this.ClinicalData.ReliabilityFood[
              index
            ].InteractionReliability_Name;
            FoodItem.Food_Name = this.ClinicalData.Food[index].Food_Name;
          });
        this.InterActionAI = this.ClinicalData.AIMasterRevision_Interaction_AI;
        if (this.InterActionAI[0])
          this.InterActionAI.forEach((AIItem, index) => {
            AIItem.Severity_Name = this.ClinicalData.SeverityAI[
              index
            ].InteractionSeverity_Name;
            AIItem.Level_Name = this.ClinicalData.LevelAI[
              index
            ].InteractionLevel_Name;
            AIItem.Reliability_Name = this.ClinicalData.ReliabilityAI[
              index
            ].InteractionReliability_Name;
            AIItem.AI_Name = this.ClinicalData.AI[index].AI_Name;
          });
        this.InterActionLabTest = this.ClinicalData.AIMasterRevision_Interaction_LabTest;
        if (this.InterActionLabTest[0])
          this.InterActionLabTest.forEach((LabTestItem, index) => {
            LabTestItem.Severity_Name = this.ClinicalData.SeverityLabTest[
              index
            ].InteractionSeverity_Name;
            LabTestItem.Level_Name = this.ClinicalData.LevelLabTest[
              index
            ].InteractionLevel_Name;
            LabTestItem.Reliability_Name = this.ClinicalData.ReliabilityLabTest[
              index
            ].InteractionReliability_Name;
            LabTestItem.LabTest_Name = this.ClinicalData.LabTest[
              index
            ].LabTest_Name;
          });
        this.InterActionHerbs = this.ClinicalData.AIMasterRevision_Interaction_Herbs;
        if (this.InterActionHerbs[0])
          this.InterActionHerbs.forEach((HerbsItem, index) => {
            HerbsItem.Severity_Name = this.ClinicalData.SeverityHerbs[
              index
            ].InteractionSeverity_Name;
            HerbsItem.Level_Name = this.ClinicalData.LevelHerbs[
              index
            ].InteractionLevel_Name;
            HerbsItem.Reliability_Name = this.ClinicalData.ReliabilityHerbs[
              index
            ].InteractionReliability_Name;
            HerbsItem.Herbs_Name = this.ClinicalData.Herbs[index].Herbs_Name;
          });
        this.InterActionAlcohol = this.ClinicalData.AIMasterRevision_Interaction_Alcohol;
        if (this.InterActionAlcohol[0])
          this.InterActionAlcohol.forEach((AlcoholItem, index) => {
            AlcoholItem.Severity_Name = this.ClinicalData.SeverityAlcohol[
              index
            ].InteractionSeverity_Name;
            AlcoholItem.Level_Name = this.ClinicalData.LevelAlcohol[
              index
            ].InteractionLevel_Name;
            AlcoholItem.Reliability_Name = this.ClinicalData.ReliabilityAlcohol[
              index
            ].InteractionReliability_Name;
            AlcoholItem.Alcohol_Name = this.ClinicalData.Alcohol[
              index
            ].Alcohol_Name;
          });
        //
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

        /**
     *  if(!isFromDosing){
                                    vm.toggleAll();
                                }
                                vm.isLoading = false;
                                 vm.ischangedInterval = 
                                $interval(function() {
                                    if(sessionStorage.dataIsChanged == "true"){
                                        $interval.cancel(vm.ischangedInterval);
                                    }
                                    else{
                                        sessionStorage.dataIsChanged = true;
                                    }
                                }, 6000);
                                vm.autoSaveInterval = 
                                $interval(function() {
                                    vm.autoSave();
                                }, 600000);
     */
      }
    );
    console.log("this inside ngOnInit", this);
  }

  myTimeoutFunction(x) {
    console.log("x inside myTimefn", x);
    console.log("this inside myTimefn", this);
    this.submitData();
    setTimeout(this.myTimeoutFunction.apply(this, this), 60000);
  }
  submitData() {
    this.ClinicalData.row_id = this.queryParams["revisionid"];
    console.log("clinicalData to submit: ", this.ClinicalData);

    this.EditAIMCService.editAIRevision(this.ClinicalData).subscribe(
      (response: boolean) => {
        if (response)
          this.notificationService.success("Data Saved successfully");
        else this.notificationService.failed("Fortunately,Data unSaved");
      }
    );
  }
  SubmitToReview() {
    this.ClinicalData.row_id = this.queryParams["revisionid"];
    this.EditAIMCService.editAIRevision(this.ClinicalData).subscribe(
      (response: boolean) => {
        if (response) {
          this.notificationService.success("Data Saved successfully");
          this.EditAIMCService.SubmitToReview({
            task_id: this.queryParams["taskid"],
            name: this.queryParams["Task_Title"],
            ai_revision_id: this.queryParams["revisionid"],
            user_id: 1,
            ai_id: this.queryParams["aicode"]
          }).subscribe((response: boolean) => {
            if (response)
              this.notificationService.success(
                "Clinical Data Sent to Reviewer"
              );
            else
              this.notificationService.success(
                "Clinical Data Wasn't Sent to Reviewer!!"
              );
          });
        } else
          this.notificationService.failed(
            "Fortunately,Data unSaved and not send to reviewer!"
          );
      }
    );
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
}
