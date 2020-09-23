import { NotificationsService } from "./../../../sys-setup/services/notifications.service";
import { Component, OnInit, Inject } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MasterTnService } from "../../services/master-tn.service";
import { startWith, map } from "rxjs/operators";
@Component({
  selector: "app-master-tn-form",
  templateUrl: "./master-tn-form.component.html",
  styleUrls: ["./master-tn-form.component.css"]
})
export class MasterTnFormComponent implements OnInit {
  //for form categories autocomplete
  activeIngredientControl = new FormControl();
  countryControl = new FormControl();
  formsControl = new FormControl();
  routeControl = new FormControl();
  optionsAIs: any[];
  optionsCountries: any[];
  optionsForms: any[];
  optionsRoutes: any[];
  filteredOptionsActiveIngredient: Observable<any[]>;
  filteredOptionsCountry: Observable<any[]>;
  displayFnStrength: any;
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
  constructor(
    public MasterTNService: MasterTnService,
    private notificationService: NotificationsService,
    private dialogRef: MatDialogRef<MasterTnFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.AIs = data.AIs;
    (this.forms = data.forms),
      (this.routes = data.routes),
      (this.countries = data.countries),
      (this.strengthUnits = data.strengthUnits),
      (this.weightUnits = data.weightUnits),
      (this.volumeUnits = data.volumeUnits),
      (this.concentrationUnits = data.concentrationUnits);

    this.optionsAIs = this.AIs;
    this.optionsCountries = this.countries;
    this.optionsForms = data.forms;
    this.optionsRoutes = this.routes;
  }

  ngOnInit() {
    this.displayedColumns = ["Country", "TN Country Full Name"];

    //Active ingredients
    this.filteredOptionsActiveIngredient = this.activeIngredientControl.valueChanges.pipe(
      startWith(""),
      map(value => {
        console.log("value", value);
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
        console.log("value", value);
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
        console.log("value", value);
        return typeof value === "string" ? value : value.Route_Name;
      }),
      map(Route_Name =>
        Route_Name ? this._filterRoute(Route_Name) : this.optionsRoutes.slice()
      )
    );
  }
  displayFnActiveIngredient(ActiveIngredient): string {
    console.log("displayfn ActiveIngredient ", ActiveIngredient);
    return ActiveIngredient && ActiveIngredient.AI_Name
      ? ActiveIngredient.AI_Name
      : "";
  }
  displayFnCountry(country): string {
    console.log("displayfn country ", country);
    return country && country.country_Name ? country.country_Name : "";
  }
  displayFnForm(form): string {
    console.log("displayfn form", form);
    return form && form.Form_Name ? form.Form_Name : "";
  }
  displayFnRoute(route): string {
    console.log("displayfn route", route);
    return route && route.Route_Name ? route.Route_Name : "";
  }

  private _filterActiveIngredient(AI_Name: string): any[] {
    console.log("AI_Name", AI_Name);
    const filterValue = AI_Name.trim().toLowerCase();

    return this.optionsAIs.filter(
      option =>
        option.AI_Name.trim()
          .toLowerCase()
          .indexOf(filterValue) >= 0
    );
  }
  private _filterCountry(Country_Name: string): any[] {
    console.log("Country_Name", Country_Name);
    const filterValue = Country_Name.trim().toLowerCase();
    return this.optionsCountries.filter(
      option =>
        option.Country_Name.trim()
          .toLowerCase()
          .indexOf(filterValue) >= 0
    );
  }
  private _filterForm(Form_Name: string): any[] {
    console.log("Form_Name", Form_Name);
    const filterValue = Form_Name.trim().toLowerCase();

    return this.optionsForms.filter(
      option =>
        option.Form_Name.trim()
          .toLowerCase()
          .indexOf(filterValue) >= 0
    );
  }
  private _filterRoute(Route_Name: string): any[] {
    console.log("Route_Name", Route_Name);
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
    if (this.activeIngredientControl.value != null) {
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
    if (this.MasterTNService.form.valid) {
      //on adding AI
      if (this.title === "Add New TN") {
        this.MasterTNService.addTNRevision(this.MasterTNService.form.value);
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit TN") {
        //update AI
        this.MasterTNService.updateTN(this.MasterTNService.form.value);
        this.notificationService.success(":: Updated Successfully");
      }
      this.MasterTNService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.dialogRef.close();
    /* this.MasterTNService.form.reset();

    //to clear form Arrays
    (this.MasterTNService.form.get(
      "TN_ActiveIngredientsIDs"
    ) as FormArray).clear();
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
    (this.MasterTNService.form.get("TN_Country_IDs") as FormArray).clear();*/
  }
}
