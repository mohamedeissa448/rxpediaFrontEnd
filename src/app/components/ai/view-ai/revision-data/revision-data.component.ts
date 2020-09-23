import { Component, OnInit, Input } from '@angular/core';
import { systemSettings } from "../../../../app-config";
import { MasterAIEditClinicalDataService } from '../../services/master-ai-clinical-data.service';

@Component({
  selector: 'app-revision-data',
  templateUrl: './revision-data.component.html',
  styleUrls: ['./revision-data.component.css']
})
export class RevisionDataComponent implements OnInit {
  @Input() AIToView:any;
  WarningMessage:boolean =false;
  navTab: string = "administration";
  SelectedAdminItem = "Administration";
  SelectedInteractionItem = "nothing";
  SelectedDosingItem = "nothing"
  SelectedGeneralParentItem = "nothing";
  SelectedGeneralItem = "nothing";

  AdministrationMenueItems : any;
  GeneralMenueItems = [];
  InteractionMenuItems: any;
  noDataHTML =systemSettings.noDataHTML;
  AIName: string;
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
  DosingNeonatal: any = [];
  DosingListComp: any = "";
  DosingAgeList: any[]=["Adult Dosings", "Pediatric Dosings", "Geriatric Dosings", "Neonatal Dosings"];;
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
  constructor(
     public EditClinicalDataService: MasterAIEditClinicalDataService
  ) {
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
  changeSelectedDosingItem(sSelectedDosingItem) {
    this.SelectedDosingItem = sSelectedDosingItem;
  }
  ngOnInit() {
    if(this.AIToView){
      this.EditClinicalDataService.getAIMasterFieldStructure().subscribe(
        (response: any) => {
          this.InteractionMenuItems = response.filter(function(obj) {
            return obj.id == "Interactions";
          });
          this.InteractionMenuItems = this.InteractionMenuItems[0];
          this.AdministrationMenueItems = response[0];
          this.GeneralMenueItems = response.splice(1, response.length);
          this.GeneralMenueItems = this.GeneralMenueItems.filter(function(obj) {
            return obj.id !== "Interactions" && obj.id !== "Dosages";
          });
        }
      );
      this.EditClinicalDataService.getAIRevision(
        parseInt(this.AIToView)
      ).subscribe(response => {
        console.log("response ai revision", response);
        this.ClinicalData = response[0];
        if(!this.ClinicalData){
          this.WarningMessage=true
        }else{
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
       
        /*
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
        });*/
        this.processDosing()
        }
        
      });
    }
  
    
  }
  processDosing(){
    this.DosingAdult = [];
    this.DosingPediatric = [];
    this.DosingGeriatric = [];
    this.DosingNeonatal = [];
    if(this.ClinicalData.AIMasterRevision_Dosing){
      this.ClinicalData.AIMasterRevision_Dosing.forEach((part, index) => {
        var DosingUsageAge =  this.ClinicalData.MasterAIRevisionDosingUsageAge.filter(obj => {
          return obj.UsageAge_Code === part.Dosing_UsageAge_Code;
        });
        part.Dosing_UsageAge_Name = DosingUsageAge[0].UsageAge_Name;
        var MedicalCondition =  this.ClinicalData.MasterAIRevisionDosingMedicalCondition.filter(obj => {
          return obj.MedicalCondition_Code === part.Dosing_MedicalCondition_Code;
        });
        part.Dosing_MedicalCondition_Name = MedicalCondition[0].MedicalCondition_Name;
        var DosingRoute =  this.ClinicalData.MasterAIRevisionDosingUsageRoute.filter(obj => {
          return obj.Route_Code === part.Dosing_Route_Code;
        });
        part.Dosing_Route_Name = DosingRoute[0].Route_Name;
        var Population =  this.ClinicalData.MasterAIRevisionPopulation.filter(obj => {
          return obj.Population_Code === part.Dosing_Population_Code;
        });
        part.Dosing_Population_Name = Population[0].Population_Name;
        if (part.Dosing_UsageAge_Code == 1)
          this.DosingAdult.push(part);
        else if (part.Dosing_UsageAge_Code == 2)
          this.DosingPediatric.push(part)
        else if (part.Dosing_UsageAge_Code == 3)
          this.DosingGeriatric.push(part)
        else if (part.Dosing_UsageAge_Code == 4)
          this.DosingNeonatal.push(part)
      });
    }
    
  }
  initGetAIInteractions(){
    this.InterActionFood=[];
    this.InterActionAI=[];
    this.InterActionAlcohol=[];
    this.InterActionLabTest=[];
    this.InterActionHerbs=[]
  this.EditClinicalDataService.getAIInteraction({
    InteractionRevision_Orignal_Code: parseInt(this.AIToView)
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
