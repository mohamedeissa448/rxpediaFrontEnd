import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { MasterAIEditClinicalDataService } from "../../services/master-ai-clinical-data.service";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { ToastService } from "../../../../services/toast.service"


@Component({
  selector: "app-interaction-add-form",
  templateUrl: "./interaction-add-form.component.html",
  styleUrls: ["./interaction-add-form.component.css"]
})
export class InteractionAddFormComponent implements OnInit {
  foodSelectControl : any;
  foodFilteredOptions: Observable<any[]>;

  drugSelectControl : any;
  drugFilteredOptions : Observable<any[]>;

  labtestSelectControl : any;
  labtestFilteredOptions : Observable<any[]>;

  herbsSelectControl : any;
  herbsFilteredOptions : Observable<any[]>;

  selectedInteractionType = 0;
  selectedAlcohol: any;
  selectedInteractionSeverity: any;
  selectedInteractionLevel: any;
  selectedInteractionReliability: any;
  InteractionAlert: any;
  InteractionPatientManagment: any;
  InteractionDiscussion: any;
  InteractionReference: any;
  InteractionRevision_AI_Code: any;
  navTab: string = "patientmanagement";

  EditorConfiguration = {
    height: "400px"
  };
  dataIsSaved = false;
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
  //new
  InteractionRevision_Reliability: any;
  InteractionRevision_Level: any;
  InteractionRevision_Severity: any;
  InteractionRevision_Alert: any;
  InteractionRevision_Patient_Management: any;
  InteractionRevision_Discussion: any;
  InteractionRevision_Reference: any;
  InteractionRevision_Food_Code: any;
  InteractionRevision_Herbs_Code: any;
  InteractionRevision_Drug_Code: any;
  InteractionRevision_Alcohol_Code: any;
  AiCode: any;
  RevisionID: any;
  isLoading = true;
  constructor(
    private ToastService :ToastService,
    private DataService: MasterAIEditClinicalDataService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InteractionAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    
    this.AiCode = data.aicode;
    this.RevisionID = data.revisionid
  }
  ngOnInit() {
    this.DataService.getInteractionData();
    this.DataService.currentInterActionFullData.subscribe(dataByService => {
      this.InteractionFullData.InteractionTypes = dataByService["InteractionTypes"];
      this.InteractionFullData.AIIDandName = dataByService["AIIDandName"];
      if(this.InteractionFullData.AIIDandName ){
        this.isLoading = false;
      }
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
    });
    this.itiateAutoCopmletControls();
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
  private _aiFilter(value: any, dataTofilter: any, Properity: string): string[] {
    if(value.length <3)
      return[];
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
    if(this.validateForm()){
      this.dataIsSaved = true;
      let dataToSend = {
        InteractionRevision_AIRevision_Code : this.RevisionID,
        InteractionRevision_Orignal_Code: this.AiCode,
        InteractionRevision_Status: 1, //always 1 on adding
        InteractionRevision_Reliability: this.InteractionRevision_Reliability,
        InteractionRevision_Severity: this.InteractionRevision_Severity,
        InteractionRevision_Level: this.InteractionRevision_Level,
        InteractionRevision_Alert: this.InteractionRevision_Alert,
        InteractionRevision_Patient_Management: this.InteractionRevision_Patient_Management,
        InteractionRevision_Discussion: this.InteractionRevision_Discussion,
        InteractionRevision_Reference: this.InteractionRevision_Reference
      };
      if (this.selectedInteractionType == 1)
        dataToSend["InteractionRevision_Food_Code"] = this.foodSelectControl.value.Food_Code;
      else if (this.selectedInteractionType == 2)
        dataToSend["InteractionRevision_AI_Code"] = this.drugSelectControl.value.AI_Code;
      else if (this.selectedInteractionType == 3)
        dataToSend["InteractionRevision_LabTest_Code"] = this.labtestSelectControl.value.LabTest_Code;
      else if (this.selectedInteractionType == 4)
        dataToSend["InteractionRevision_Herbs_Code"] = this.herbsSelectControl.value.Herbs_Code;
      else if (this.selectedInteractionType == 5)
        dataToSend["InteractionRevision_Alcohol_Code"] = this.InteractionRevision_Alcohol_Code.Alcohol_Code;
      this.DataService.AddMasterAIRevisionInteraction(dataToSend).subscribe(
        status => {
          if (status){
            this.ToastService.success("Interaction Added Successfully");
            this.clearForm();
          }
        }
      );
    }
  }
  validateForm(){
    if(this.InteractionRevision_Reliability){
      this.ToastService.failed("Reliability Should Be Selected!");
      return false
    }
    else if(this.InteractionRevision_Severity){
      this.ToastService.failed("Severity Should Be Selected!");
      return false
    }
    else if(this.InteractionRevision_Level){
      this.ToastService.failed("Level Should Be Selected!");
      return false
    }
    else{
      return true;
    }
  }
  clearForm() {
    this.RevisionID = null;
    this.AiCode = null;
    this.InteractionRevision_Reliability = null;
    this.InteractionRevision_Severity = null;
    this.InteractionRevision_Level = null;
    this.InteractionRevision_Alert = null;
    this.InteractionRevision_Patient_Management = null;
    this.InteractionRevision_Discussion = null;
    this.InteractionRevision_Reference = null;
    this.itiateAutoCopmletControls();
  }
  itiateAutoCopmletControls(){
    this.foodSelectControl = new FormControl();
    this.foodFilteredOptions = this.foodSelectControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        this._filter(value, this.InteractionFullData.ActiveFoods, "Food_Name")
      )
    );

    this.drugSelectControl = new FormControl();
    this.drugFilteredOptions = this.drugSelectControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        this._aiFilter(value, this.InteractionFullData.AIIDandName, "AI_Name")
      )
    );

    this.labtestSelectControl = new FormControl();
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

    this.herbsSelectControl = new FormControl();
    this.herbsFilteredOptions = this.herbsSelectControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        this._filter(value, this.InteractionFullData.ActiveHerbs, "Herbs_Name")
      )
    );
  }
  close() {
    this.dialogRef.close(this.dataIsSaved);
  }
}
