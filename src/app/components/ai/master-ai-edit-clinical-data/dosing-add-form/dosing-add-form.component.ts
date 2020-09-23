import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MasterAIEditClinicalDataService } from "../../services/master-ai-clinical-data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../../app-config";
import { NotificationsService } from "./../../../sys-setup/services/notifications.service";

@Component({
  selector: "app-dosing-add-form",
  templateUrl: "./dosing-add-form.component.html",
  styleUrls: ["./dosing-add-form.component.css"]
})
export class DosingAddFormComponent implements OnInit {
  DosingData:any = {}
  usageAges: any;
  population: any;
  medicalConditions = [];
  activeRoutes: any;
  dataIsSaved = false;
  isLoading = true;
  EditorConfiguration = {
    height: "300px"
  };
  form: FormGroup;
  revisionid:number;
  myControl: any;
  filteredOptions: Observable<any[]>;
  constructor(
    private http:HttpClient,
    private DataService: MasterAIEditClinicalDataService,
    private dialogRef: MatDialogRef<DosingAddFormComponent>,
    private notificationService:NotificationsService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.revisionid=data.revisionid
  }
  ngOnInit() {
    this.DataService.getUsageAges().subscribe(usageAges => {
      this.usageAges = usageAges;
      this.DataService.getPopulation().subscribe((population:any) => {
        this.population = population.slice(1);
        this.DataService.getMedicalCondition().subscribe((medicalConditions: any) => {
          this.medicalConditions = medicalConditions;
          this.DataService.getActiveRoute().subscribe(activeRoutes => {
            this.activeRoutes = activeRoutes;
            this.isLoading = false;
          });
          this.intiateAutoComplete();
        });
      });
    });
    
    
  }

  intiateAutoComplete(){
    this.myControl = new FormControl();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }
  AddDosing() {
    if(this.myControl.value){
      this.dataIsSaved=true;
      this.DosingData.Dosing_MedicalCondition_Code= this.myControl.value.MedicalCondition_Code ;
      if(!this.DosingData.Dosing_Population_Code)
        this.DosingData.Dosing_Population_Code =1;
      var datatosend = {AIMasterRevision_Code:this.revisionid , AIMasterRevision_Dosing: this.DosingData};
      this.http.post(`${systemSettings.serverAIURL}/AddMasterAIRevisionDosing`,datatosend)
      .subscribe((response:any)=>{
        if(response.message==true){
          this.DosingData = {};
          this.intiateAutoComplete()
          this.notificationService.success("New Dosing Added Successfully")
        }
        else
        this.notificationService.failed(
          "unFortunately,Something went wrong,Please try again later"
        );
      })
    }
    else{
      this.notificationService.failed(
        "Please select Medical Condition"
      );
    }
  }

  close() {
    this.dialogRef.close(this.dataIsSaved);
  }
  
  private _filter(value: any): any[] {
    if (value.length < 5) {
      return null;
    }
    let filterValue;
    if (value) filterValue = value.toLowerCase();

    return this.medicalConditions.filter(option => {
      if (option.MedicalCondition_Name)
        return option.MedicalCondition_Name.toLowerCase().includes(filterValue);
    });
  }
  displaymedicalConditionFnction(baseItem) {
    return baseItem ? baseItem.MedicalCondition_Name : undefined;
  }
}
