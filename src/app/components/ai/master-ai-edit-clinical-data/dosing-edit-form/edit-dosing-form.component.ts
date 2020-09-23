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
  selector: 'app-edit-dosing-form',
  templateUrl: './edit-dosing-form.component.html',
  styleUrls: ['./edit-dosing-form.component.css']
})
export class DosingEditFormComponent implements OnInit {

  usageAges: any;
  population: any;
  medicalConditions = [];
  activeRoutes: any;

  EditorConfiguration = {
    height: "300px"
  };
  myControl: any;
  form: FormGroup;
  revisionid:number;
  row_id:String;
  dosingItem:any={}
  isLoading = true;
  constructor(
    private http:HttpClient,
    private DataService: MasterAIEditClinicalDataService,
    private dialogRef: MatDialogRef<DosingEditFormComponent>,
    private notificationService:NotificationsService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.revisionid=data.revisionid;
    this.row_id =data.row_id ;
    this.dosingItem=data.dosingItem
  }
  ngOnInit() {
    console.log("dosingItem",this.dosingItem)
    this.dosingItem.MedicalCondition_Name = this.dosingItem.Dosing_MedicalCondition_Name
    

    this.DataService.getUsageAges().subscribe(usageAges => {
      this.usageAges = usageAges;
      this.DataService.getPopulation().subscribe(population => {
        this.population = population;
        this.DataService.getActiveRoute().subscribe(activeRoutes => {
          this.activeRoutes = activeRoutes;
          this.DataService.getMedicalCondition().subscribe(
            (medicalConditions: any) => {
              this.medicalConditions = medicalConditions;
              this.myControl = new FormControl();
              this.myControl.setValue(this.dosingItem)
              console.log("this.myControl",this.myControl)
              this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(""),
                map(value => this._filter(value))
              );
              this.isLoading = false;
            }
          );
        });
      });
    });
    
  }

  save(formValues) {
    var datatosend = {
      AIMasterRevision_Code:this.revisionid ,
      row_id:this.row_id,
      Dosing_UsageAge_Code:formValues.Dosing_UsageAge_Code,
      Dosing_Population_Code :formValues.Dosing_Population_Code,
      Dosing_MedicalCondition_Code :this.myControl.value.Dosing_MedicalCondition_Code,
      Dosing_Route_Code :formValues.Dosing_Route_Code,
      Dosing_Discussion :formValues.Dosing_Discussion,
    }
    console.log("datatosend",datatosend)

    this.http.post(`${systemSettings.serverAIURL}/EditMasterAIRevisionDosing`,datatosend)
    .subscribe((response:any)=>{
      if(response.message==true){
        this.notificationService.success("Dosing Updated Successfully");
        this.dialogRef.close(true);
      }
      else{
        this.notificationService.failed("unFortunately,Something went wrong,Please try again later");
        this.dialogRef.close(false);
      }
    })
  }

  close() {
    this.dialogRef.close(false);
  }

  filteredOptions: Observable<any[]>;

  private _filter(value: any): any[] {
    console.log("value", value);
    let filterValue;
    if (value) filterValue = value.toLowerCase();

    return this.medicalConditions.filter(option => {
      if (option.MedicalCondition_Name)
        return option.MedicalCondition_Name.toLowerCase().includes(filterValue);
    });
  }
  displaymedicalConditionFnction(baseItem) {
    console.log("baseitem", baseItem);
    return baseItem ? baseItem.MedicalCondition_Name  : undefined;
  }

}
