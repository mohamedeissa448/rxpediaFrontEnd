import { FormBuilder, FormGroup } from "@angular/forms";
import { NotificationsService } from "./../../../sys-setup/services/notifications.service";
import { Component, OnInit, Inject } from "@angular/core";
import { MasterAIEditClinicalDataService } from "../../services/master-ai-clinical-data.service";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-interaction-edit-form",
  templateUrl: "./interaction-edit-form.component.html",
  styleUrls: ["./interaction-edit-form.component.css"]
})
export class InteractionEditFormComponent implements OnInit {
  foodSelectControl = new FormControl();
  foodFilteredOptions: Observable<string[]>;

  drugSelectControl = new FormControl();
  drugFilteredOptions: Observable<string[]>;

  labtestSelectControl = new FormControl();
  labtestFilteredOptions: Observable<string[]>;
  herbsSelectControl = new FormControl();
  herbsFilteredOptions: Observable<string[]>;
  selectedInteractionType = 0;
  selectedAlcohol: any;
  selectedInteractionSeverity: any;
  selectedInteractionLevel: any;
  selectedInteractionReliability: any;
  InteractionAlert: any;
  InteractionPatientManagment: any;
  InteractionDiscussion: any;
  InteractionReference: any;
  navTab: string = "patientmanagement";

  EditorConfiguration = {
    height: "400px"
  };

  InteractionFullData = {
    InteractionTypes: [],
    AIIDandName: [],
    ActiveAlcohol: [],
    ActiveFoods: [],
    ActiveHerbs: [],
    ActiveLabTest: [],
    InteractionLevel: [],
    InteractionReliability: [],
    InteractionSeverity: []
  };

  form: FormGroup;
  description: string;
  title: string;
  //new
  InteractionRevision_Reliability: any;
  InteractionRevision_Level: any;
  InteractionRevision_Severity: any;
  InteractionRevision_Alert: any;
  InteractionRevision_Patient_Management: any;
  InteractionRevision_Discussion: any;
  InteractionRevision_Reference: any;
  
  InteractionRevision_Alcohol_Code: any;
  aicode: any;
  revisionid: any;
  interactionDetail:any;
  interactionType: any;
  dataIsSaved = false;
  constructor(
    private notificationService: NotificationsService,
    private DataService: MasterAIEditClinicalDataService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InteractionEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data.description;
    this.title = data.title;
    this.aicode = data.aicode;
    this.interactionType = data.type;
    this.revisionid = data.revisionid;
    this.interactionDetail=data.interactionDetail
  }
  ngOnInit() {
    //initiate form fields
    if(this.interactionType=='FoodInteractions')
    this.foodSelectControl.setValue(this.interactionDetail.Food[0])
    if(this.interactionType=='DrugInteractions'){
      console.log('ai')
      console.log(this.interactionDetail)
      if(this.interactionDetail.AIForeign.length > 0){
        this.drugSelectControl.setValue(this.interactionDetail.AIForeign[0])
      }
      else {
        this.drugSelectControl.setValue(this.interactionDetail.AIRevisionForeign[0])
      }
    }
    
    if(this.interactionType=='LabTestsInteractions')
    this.labtestSelectControl.setValue(this.interactionDetail.LabTest[0])
    if(this.interactionType=='HerbsInteractions')
    this.herbsSelectControl.setValue(this.interactionDetail.Herbs[0])
    if(this.interactionType=='AlcoholInteractions')
    this.InteractionRevision_Alcohol_Code=this.interactionDetail.Alcohol[0].Alcohol_Code
    //if(this.interactionType=='InteractionGeneralInfo')
    //this.labtestSelectControl.setValue(this.interactionDetail.Food[0])
    //initiate rest of form fields
    
    this.InteractionRevision_Severity=this.interactionDetail.Severity[0].InteractionSeverity_Code
    this.InteractionRevision_Level=this.interactionDetail.Level[0].InteractionLevel_Code
    this.InteractionRevision_Reliability=this.interactionDetail.Reliability[0].InteractionReliability_Code
    this.InteractionRevision_Alert=this.interactionDetail.InteractionRevision_Alert
    this.InteractionRevision_Patient_Management=this.interactionDetail.InteractionRevision_Patient_Management
    this.InteractionRevision_Discussion=this.interactionDetail.InteractionRevision_Discussion
    this.InteractionRevision_Reference=this.interactionDetail.InteractionRevision_Reference;






    this.DataService.getInteractionData();
    this.DataService.currentInterActionFullData.subscribe(dataByService => {
      this.InteractionFullData.InteractionTypes =
        dataByService["InteractionTypes"];
      this.InteractionFullData.AIIDandName = dataByService["AIIDandName"];
      this.InteractionFullData.ActiveAlcohol = dataByService["ActiveAlcohol"];
      this.InteractionFullData.ActiveFoods = dataByService["ActiveFoods"];
      this.InteractionFullData.ActiveHerbs = dataByService["ActiveHerbs"];
      this.InteractionFullData.ActiveLabTest = dataByService["ActiveLabTest"];
      this.InteractionFullData.InteractionLevel =
        dataByService["InteractionLevel"];
      this.InteractionFullData.InteractionReliability =
        dataByService["InteractionReliability"];
      this.InteractionFullData.InteractionSeverity =
        dataByService["InteractionSeverity"];
    });
    this.form = this.fb.group({
      description: [this.description, []]
    });
    this.foodFilteredOptions = this.foodSelectControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        this._filter(value, this.InteractionFullData.ActiveFoods, "Food_Name")
      )
    );
    this.drugFilteredOptions = this.drugSelectControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        this._filter(value, this.InteractionFullData.AIIDandName, "AI_Name")
      )
    );
    this.labtestFilteredOptions = this.labtestSelectControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        this._filter(
          value,
          this.InteractionFullData.ActiveLabTest,
          "LabTest_Name"
        )
      )
    );
    this.herbsFilteredOptions = this.herbsSelectControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        this._filter(value, this.InteractionFullData.ActiveHerbs, "Herbs_Name")
      )
    );
  }
  private _filter(value: any, dataTofilter: any, Properity: string): string[] {
    var filterValue;
    typeof value != "object"
      ? (filterValue = value.toLowerCase())
      : (filterValue = "");
    return dataTofilter.filter(
      option => option[Properity].toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFoodFnction(baseItem) {
    return baseItem ? baseItem.Food_Name : undefined;
  }
  displayDrugFnction(AIItem) {
    return AIItem ? AIItem.AI_Name : undefined;
  }
  displayLabtestFnction(labtestItem) {
    return labtestItem ? labtestItem.LabTest_Name : undefined;
  }
  displayHerbsFnction(herbsItem) {
    console.log(herbsItem);
    return herbsItem ? herbsItem.Herbs_Name : undefined;
  }
  changeNavTab(tabName) {
    this.navTab = tabName;
  }
  save() {
    this.dataIsSaved = true;
    let dataToSend = {
      InteractionRevision_Orignal_Code: this.aicode,
      InteractionRevision_Status: 1, //always 1 on adding
      InteractionRevision_Reliability: this.InteractionRevision_Reliability,
      InteractionRevision_Severity: this.InteractionRevision_Severity,
      InteractionRevision_Level: this.InteractionRevision_Level,
      InteractionRevision_Alert: this.InteractionRevision_Alert,
      InteractionRevision_Patient_Management: this
        .InteractionRevision_Patient_Management,
      InteractionRevision_Discussion: this.InteractionRevision_Discussion,
      InteractionRevision_Reference: this.InteractionRevision_Reference,
      InteractionRevision_Code:this.interactionDetail.InteractionRevision_Code//not sure
    };
    if (this.interactionType=='FoodInteractions'){
      dataToSend[
        "InteractionRevision_Food_Code"
      ] = this.foodSelectControl.value.Food_Code;
      dataToSend["Type"] = 1;
    }
    else if (this.interactionType == 'DrugInteractions'){
      dataToSend[
        "InteractionRevision_AI_Code"
      ] = this.drugSelectControl.value.AI_Code;
      dataToSend["Type"] = 2;
    }
    else if (this.interactionType == 'LabTestsInteractions'){
      dataToSend[
        "InteractionRevision_LabTest_Code"
      ] = this.labtestSelectControl.value.LabTest_Code;
      dataToSend["Type"] = 3;
    }
    else if (this.interactionType == 'HerbsInteractions'){
      dataToSend[
        "InteractionRevision_Herbs_Code"
      ] = this.herbsSelectControl.value.Herbs_Code;
      dataToSend["Type"] = 3;
    }
    else if (this.interactionType == 'AlcoholInteractions'){
      dataToSend[
        "InteractionRevision_Alcohol_Code"
      ] = this.InteractionRevision_Alcohol_Code;
      dataToSend["Type"] = 2;
    }
    console.log("dataTOsend", dataToSend);

    this.DataService.EditMasterAIRevisionInteraction(dataToSend).subscribe(
      status => {
        if (status){
          this.notificationService.success("Interaction Updated Successfully");
          this.close()
        }else{
          this.notificationService.failed("Something went wrong,Please try again later!");
        }
          
      }
    );
    
  }
  close() {
    this.dialogRef.close(this.dataIsSaved);
  }
}
