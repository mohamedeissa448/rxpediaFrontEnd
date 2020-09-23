import { Component, OnInit, Input } from '@angular/core';
import { MasterAIService } from '../../services/master-ai.service'
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { MasterAIEditClinicalDataService } from "../../services/master-ai-clinical-data.service";

import {systemSettings} from '../../../../app-config'
@Component({
  selector: 'app-view-master-ai-clinical-data',
  templateUrl: './master-ai-clinical-data.component.html',
  styleUrls: ['./master-ai-clinical-data.component.css']
})
export class ViewMasterAiClinicalDataComponent implements OnInit {
  @Input() AIToView:any;

  navTab: string = "administration";
  SelectedAdminItem = "Administration";
  SelectedInteractionItem = "nothing";
  SelectedGeneralParentItem = "nothing";
  SelectedGeneralItem = "nothing";
  SelectedDosingItem = "nothing"
  noDataHTML =systemSettings.noDataHTML;
  AdministrationMenueItems: any = [];
  GeneralMenueItems = [];
  InteractionMenuItems: any = [];
  ClinicalData: any={};
  BreastFeedingCategory: any;
  PregnancyCategory: any;
  InterActionFood: any = [];
  InterActionAI: any = [];
  InterActionAlcohol: any= [];
  InterActionLabTest: any= [];
  InterActionHerbs: any=[];
  InterAction: any;
  DosingListComp: any;
  DosingAgeList: any=["Adult Dosings", "Pediatric Dosings", "Geriatric Dosings", "Neonatal Dosings"];
  DosingAgeGgroupList: any;
  DosingAgeGgroupObjectList: any = [];
  DosingAdult: any= [];
  DosingNeonatal: any = [];
  DosingGeriatric: any=[];
  DosingRenalImpairmentAdult: any=[];
  DosingHepaticImpairmentAdult: any=[];
  DosingRenalImpairmentPediatric: any=[];
  DosingHepaticImpairmentPediatric: any=[];
  DosingPediatric: any;
  constructor(public MasterAIService: MasterAIService, public EditClinicalDataService: MasterAIEditClinicalDataService) { }
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
      this.MasterAIService.getAIMasterFieldStructure().subscribe((FieldStructureResponse: any) => {
        this.InteractionMenuItems = FieldStructureResponse.filter(function(obj) {
          return obj.id == "Interactions";
        });
        this.InteractionMenuItems = this.InteractionMenuItems[0];
        this.AdministrationMenueItems = FieldStructureResponse[0];
        this.GeneralMenueItems = FieldStructureResponse.splice(1, FieldStructureResponse.length);
        this.GeneralMenueItems = this.GeneralMenueItems.filter(function(obj) {
          return obj.id !== "Interactions" && obj.id !== "Dosages";
        });
        this.MasterAIService.getAIFullClinicalDataByID(parseInt(this.AIToView)).subscribe((response:any)=>{
          console.log("response ai revision", response);
          this.ClinicalData = response;
          if(response.AIBreastFeedingCategory)
            this.BreastFeedingCategory = response.AIBreastFeedingCategory[0].BreastFeeding_Name;
          else
            this.BreastFeedingCategory = "Category Not Selected !";
          if(response.AIPregnancyCategory)
            this.PregnancyCategory = response.AIPregnancyCategory[0].Pregnancy_Name;
          else
            this.PregnancyCategory = "Category Not Selected !";
          this.initGetAIInteractions();
        });
      });
    }
    this.processDosing()
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
      InteractionRevision_Orignal_Code:parseInt(this.AIToView) 
    }).subscribe((response: any) => {
      console.log("response from getAIInteraction", response);
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
    })
  };
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


