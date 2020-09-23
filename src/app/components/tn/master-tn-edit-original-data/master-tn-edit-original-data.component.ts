import { NotificationsService } from "./../../sys-setup/services/notifications.service";
import { MasterTnService } from "./../services/master-tn.service";
import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, FormArray } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ViewCommentsComponent } from '../view-comments/view-comments.component';

@Component({
  selector: 'app-master-tn-edit-original-data',
  templateUrl: './master-tn-edit-original-data.component.html',
  styleUrls: ['./master-tn-edit-original-data.component.css']
})
export class MasterTnEditOriginalDataComponent implements OnInit {
  actionisLoading = false;
  isFinished = false;
  FinsheMessage: string;
  //for form categories autocomplete
  activeIngredientControl = new FormControl();
  countryControl = new FormControl();
  formsControl = new FormControl();
  routeControl = new FormControl();
  optionsAIs: any=[];
  optionsCountries: any=[];
  optionsForms: any=[];
  optionsRoutes: any=[];
  filteredOptionsActiveIngredient: Observable<any[]>;
  filteredOptionsCountry: Observable<any[]>;

  filteredOptionsForm: Observable<any[]>;
  filteredOptionsRoute: Observable<any[]>;

  //end
  title;
  concentrationUnits: any;
  forms: any;
  routes: any;
  countries: any;
  strengthUnits: any;
  weightUnits: any;
  volumeUnits: any;
  AIs: any;
  displayedColumns;
  displayFnStrength;
  revisionid;
  RevisionData;
  commentsList;
  constructor(
    public MasterTNService: MasterTnService,
    private notificationService: NotificationsService,
    private route:ActivatedRoute,
    private dialog: MatDialog,
  ) {
    
    this.route.queryParams.subscribe(params => {
      this.revisionid = params['revisionid'];
 
    this.MasterTNService.getAllAIminiData().subscribe((AIs: []) => {
      this.AIs = AIs;
      this.MasterTNService.getTNRevisionByID({
        tn_revision_id:parseInt(this.revisionid) 
      }).subscribe((response: any) => {
        this.RevisionData = response;
        this.commentsList = response.TNRevision_Comments;
        this.MasterTNService.popualteForm({
          ActualAI: this.RevisionData.ActualAI,//[],
          TN_ActiveIngredients: this.RevisionData.TNRevision_ActiveIngredients,//[3339],
          TN_ActualActiveIngredients: this.RevisionData.TNRevision_ActualActiveIngredients,//[3339],
          TN_Code: this.RevisionData.TNRevision_Code,//2,
          TN_Country_Data:  this.RevisionData.TNRevision_Country_Data,//[{_id: "5e833df85e04c95baef98739", TN_Data_Country_ID: 66, TN_Data_Country_FullName: "No Name TN 500g Oral tab"}],
          TN_Country_ID:  this.RevisionData.TNRevision_Country_ID,//[66, 195],
          TN_Data_Strength: this.RevisionData.TNRevision_Data_Strength,//[{_id: "5e833df85e04c95baef98737", TN_Data_Strength_AI_ID: 3339, TN_Data_Strength_Value: "500", TN_Data_Strength_Unite_ID: 38}],
          TN_Form_ID: this.RevisionData.TNRevision_Form_ID,//260,
          TN_Name: this.RevisionData.TNRevision_Name,//"No Name TN",
          TN_Route_ID: this.RevisionData.TNRevision_Route_ID,//84,
          TN_Status: this.RevisionData.TNRevision_Status,//0,
          ai: this.RevisionData.aiRevision,//[],
          concentration: this.RevisionData.concentration,//null,
          country:  this.RevisionData.country,//[{_id: "5b8b48df03e1c4cefdd8d7f3", Country_Code: 66, Country_Name: "Egypt", Country_Tcode: "EG"}],
          form: this.RevisionData.form,//{_id: "5e6fe8ffe9cc481754c62d35", Form_Code: 260, Form_Name: "TABLET"},
          id: this.RevisionData.id,//"5e833df85e04c95baef98736",
          route: this.RevisionData.route,// {_id: "5e6fe778b03154166ac7426f", Route_Code: 84, Route_Name: "ORAL"},
          strength: this.RevisionData.strength,//[{_id: "5e774fd82913b076f602879a", StrengthUnit_Code: 38, StrengthUnit_Name: "gram (g)"}],
          volume: this.RevisionData.volume,//null,
          weight:  this.RevisionData.weight,//null,
        })
        this.MasterTNService.getForm().subscribe((response: any) => {
          this.forms = response;
          this.MasterTNService.getRoute().subscribe((response: any) => {
            this.routes = response;
            this.MasterTNService.getCountries().subscribe((response: any) => {
              this.countries = response;
              this.MasterTNService.getStrengthUnits().subscribe((response: any) => {
                this.strengthUnits = response;
                this.MasterTNService.getWeightUnits().subscribe((response: any) => {
                  this.weightUnits = response;
                  this.MasterTNService.getVolumeUnits().subscribe((response: any) => {
                    this.volumeUnits = response;
                    this.MasterTNService.getConcentration().subscribe((response: any) => {
                      this.concentrationUnits = response;
                      this.optionsAIs = this.AIs;
                      this.optionsCountries = this.countries;
                      this.optionsForms = this.forms;
                      this.optionsRoutes = this.routes;
                      this.Initialize()
                    });
                  });
                });
              });
            });
          });
        });
        
      })
       
    });
  });
    
  }
Initialize(){
    //Active ingredients
    this.filteredOptionsActiveIngredient = this.activeIngredientControl.valueChanges.pipe(
      startWith(""),
      map(value => {
        //console.log("value", value);
        return typeof value === "string" ? value : value.AI_Name;
      }),
      map(AI_Name =>
        AI_Name
          ? this._filterActiveIngredient(AI_Name)
          : this.optionsAIs.slice()
      )
    );
    //  Countries
    this.filteredOptionsCountry = this.countryControl.valueChanges.pipe(
      startWith(""),
      map(value => {
        console.log("value", value);
        return typeof value === "string" ? value : value.Country_Name;
      }),
      map(Country_Name =>
        Country_Name
          ? this._filterCountry(Country_Name)
          : this.optionsCountries.slice()
      )
    );
    //Forms
    this.filteredOptionsForm = this.formsControl.valueChanges.pipe(
      startWith(""),
      map(value => {
      //  console.log("value", value);
        return typeof value === "string" ? value : value.Form_Name;
      }),
      map(Form_Name =>
        Form_Name ? this._filterForm(Form_Name) : this.optionsForms.slice()
      )
    );
    //Routes
    this.filteredOptionsRoute = this.routeControl.valueChanges.pipe(
      startWith(""),
      map(value => {
       // console.log("value", value);
        return typeof value === "string" ? value : value.Route_Name;
      }),
      map(Route_Name =>
        Route_Name ? this._filterRoute(Route_Name) : this.optionsRoutes.slice()
      )
    );
}
  ngOnInit() {


  }
  displayFnActiveIngredient(ActiveIngredient): string {
   // console.log("displayfn ActiveIngredient ", ActiveIngredient);
    return ActiveIngredient && ActiveIngredient.AI_Name
      ? ActiveIngredient.AI_Name
      : "";
  }
  displayFnCountry(country): string {
   // console.log("displayfn country ", country);
    return country && country.country_Name ? country.country_Name : "";
  }
  displayFnForm(form): string {
   // console.log("displayfn form", form);
    return form && form.Form_Name ? form.Form_Name : "";
  }
  displayFnRoute(route): string {
    //console.log("displayfn route", route);
    return route && route.Route_Name ? route.Route_Name : "";
  }

  private _filterActiveIngredient(AI_Name: string): any[] {
   // console.log("AI_Name", AI_Name);
    const filterValue = AI_Name.trim().toLowerCase();

    return this.optionsAIs.filter(
      option =>
        option.AI_Name.trim()
          .toLowerCase()
          .indexOf(filterValue) >= 0
    );
  }
  private _filterCountry(Country_Name: string): any[] {
    //console.log("Country_Name", Country_Name);
    const filterValue = Country_Name.trim().toLowerCase();
    return this.optionsCountries.filter(
      option =>
        option.Country_Name.trim()
          .toLowerCase()
          .indexOf(filterValue) >= 0
    );
  }
  private _filterForm(Form_Name: string): any[] {
   // console.log("Form_Name", Form_Name);
    const filterValue = Form_Name.trim().toLowerCase();

    return this.optionsForms.filter(
      option =>
        option.Form_Name.trim()
          .toLowerCase()
          .indexOf(filterValue) >= 0
    );
  }
  private _filterRoute(Route_Name: string): any[] {
    //console.log("Route_Name", Route_Name);
    const filterValue = Route_Name.trim().toLowerCase();

    return this.optionsRoutes.filter(
      option =>
        option.Route_Name.trim()
          .toLowerCase()
          .indexOf(filterValue) >= 0
    );
  }
  addSelectedActiveIngredient() {
    console.log(
      "active ingredient selected",
      this.activeIngredientControl.value
    );
    if (this.activeIngredientControl.value != null && this.activeIngredientControl.value != '') {
      this.MasterTNService.addSelectedActiveIngredient(
        this.activeIngredientControl.value
      );
      this.activeIngredientControl.setValue("");
    }
  }
  deleteSelectedActiveIngredient(AI_Code) {
    console.log("AI_Code deleted", AI_Code);
    this.MasterTNService.deleteSelectedActiveIngredient(AI_Code);
  }

  addSelectedCountry() {
    console.log("country selected", this.countryControl.value);
    if (this.countryControl.value != null) {
      this.MasterTNService.addSelectedCountry(this.countryControl.value);
      this.countryControl.setValue("");
    }
  }
  deleteSelectedCountry(Country_Code) {
    console.log("Country_Code deleted", Country_Code);
    this.MasterTNService.deleteSelectedCountry(Country_Code);
  }

  addSelectedForm() {
    console.log("TN_Form_ID selected", this.formsControl.value);
    if (this.formsControl.value != null) {
      this.MasterTNService.addSelectedForm(this.formsControl.value);
      this.formsControl.setValue("");
    }
  }
  deleteSelectedForm(Form_Code) {
    console.log("Form_Code deleted", Form_Code);
    this.MasterTNService.deleteSelectedForm(Form_Code);
  }
  addSelectedRoute() {
    console.log("TN_Route_ID selected", this.routeControl.value);
    if (this.routeControl.value != null) {
      this.MasterTNService.addSelectedRoute(this.routeControl.value);
      this.routeControl.setValue("");
    }
  }
  deleteSelectedRoute(Route_Code) {
    console.log("Route_Code deleted", Route_Code);
    this.MasterTNService.deleteSelectedRoute(Route_Code);
  }
  addSelectedStrength() {
    console.log(
      "active ingredient selected",
      this.activeIngredientControl.value
    );
    if (this.activeIngredientControl.value != null) {
      this.MasterTNService.addSelectedStrength(
        this.activeIngredientControl.value
      );
      this.activeIngredientControl.setValue("");
    }
  }
  deleteSelectedStrength(AI_Code) {
    console.log("AI_Code deleted", AI_Code);
    this.MasterTNService.deleteSelectedStrength(AI_Code);
  }

  onClear() {
    this.MasterTNService.form.reset();
  }

  onSubmit() {
    console.log("onSubmt");
    this.actionisLoading = true;
    this.MasterTNService.EditTNRevision().subscribe(
      (response: boolean) => {
        if (response){
          this.isFinished = true;
          this.notificationService.success("Data Sent To Reviewer Successfully");
          this.FinsheMessage = "Data Sent To Reviewer Successfully"
          this.actionisLoading = false;
        }
        else {
          this.notificationService.failed("unFortunately,Data unSaved");
          this.actionisLoading = false;
        }

      }
    );
      this.MasterTNService.form.reset();

      this.onClose();
    }
  
  showComments(){
    this.RevisionData.FromEmployee.forEach((emp,index)=>{
      this.commentsList[index].TNRevision_Comments_Employee_Name=emp.Employee_Name
    })
    this.RevisionData.ToEmployee.forEach((emp,index)=>{
      this.commentsList[index].TNRevision_Comments_ToEmployee_Name=emp.Employee_Name
    })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
       title: "Comments",
       commentsData : this.commentsList,
       //employeesArray: employeeUnionArray 
  };
    dialogConfig.disableClose=true
    let dialogRef=this.dialog.open(ViewCommentsComponent, dialogConfig);
  }
  onClose() {
    this.MasterTNService.form.reset();
    //to clear form Arrays
    (this.MasterTNService.form.get(
      "TN_ActiveIngredientsIDs"
    ) as FormArray).clear();
    (this.MasterTNService.form.get(
      "TN_ActiveIngredients"
    ) as FormArray).clear();
    const xx = this.MasterTNService.form.get(
      "TN_ActiveIngredients"
    ) as FormArray;
    (this.MasterTNService.form.get("TN_Form_ID") as FormArray).clear();
    (this.MasterTNService.form.get("TN_Route_ID") as FormArray).clear();
    (this.MasterTNService.form.get(
      "TN_ActualActiveIngredientsIDs"
    ) as FormArray).clear();
    (this.MasterTNService.form.get(
      "TN_ActualActiveIngredientsObjects"
    ) as FormArray).clear();
    (this.MasterTNService.form.get("TN_Data_Strength") as FormArray).clear();
    (this.MasterTNService.form.get("TN_Countries") as FormArray).clear();
    (this.MasterTNService.form.get("TN_Country_Data") as FormArray).clear();
    (this.MasterTNService.form.get("TN_Country_IDs") as FormArray).clear();
  }

}
