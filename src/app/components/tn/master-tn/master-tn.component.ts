import { MasterTnService } from "./../services/master-tn.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialogConfig,
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource
} from "@angular/material";
import { FormArray } from "@angular/forms";
import { MasterTnFormComponent } from "./master-tn-form/master-tn-form.component";
import { EditFormComponent } from "./edit-form/edit-form.component";

@Component({
  selector: "app-master-tn",
  templateUrl: "./master-tn.component.html",
  styleUrls: ["./master-tn.component.css"]
})
export class MasterTnComponent implements OnInit {
  TNs;
  AIs;
  forms;
  routes;
  countries;
  categories;
  searchKey: string;
  displayedColumns: string[] = [
    "Name",
    "AI",
    "Strength",
    "Route",
    "Form",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  strengthUnits: any;
  weightUnits: any;
  volumeUnits: any;
  concentrationUnits: any;

  constructor(
    private dialog: MatDialog,
    public MasterTNService: MasterTnService
  ) {}

  ngOnInit() {
    this.MasterTNService.getTNfilterByLetter("").subscribe((TNs: []) => {
      this.isLoading = false;
      console.log("our TNs", TNs);
      this.TNs = new MatTableDataSource(TNs);
      this.TNs.sort = this.sort;
      this.TNs.paginator = this.paginator;
      this.MasterTNService.getAllAIminiData().subscribe((AIs: []) => {
        this.AIs = AIs;
      });
      this.MasterTNService.getForm().subscribe((response: any) => {
        this.forms = response;
        console.log("resss", this.forms);
      });
      this.MasterTNService.getRoute().subscribe((response: any) => {
        this.routes = response;
      });
      this.MasterTNService.getCountries().subscribe((response: any) => {
        this.countries = response;
      });
      this.MasterTNService.getStrengthUnits().subscribe((response: any) => {
        this.strengthUnits = response;
      });
      this.MasterTNService.getWeightUnits().subscribe((response: any) => {
        this.weightUnits = response;
      });
      this.MasterTNService.getVolumeUnits().subscribe((response: any) => {
        this.volumeUnits = response;
      });
      this.MasterTNService.getConcentration().subscribe((response: any) => {
        this.concentrationUnits = response;
      });
    });
  }

  onAdd() {
    this.clearForm();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      title: "Add New TN",
      AIs: this.AIs,
      forms: this.forms,
      routes: this.routes,
      countries: this.countries,
      strengthUnits: this.strengthUnits,
      weightUnits: this.weightUnits,
      volumeUnits: this.volumeUnits,
      concentrationUnits: this.concentrationUnits
    };
    this.dialog.open(MasterTnFormComponent, dialogConfig);
  }
  onEdit(element) {
    //           *ngIf="element.TN_Status != 0 && element.TN_Status != 1"
    console.log("xx",element)
    this.clearForm();
    this.MasterTNService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      title: "Edit TN",
      AIs: this.AIs,
      forms: this.forms,
      routes: this.routes,
      countries: this.countries,
      strengthUnits: this.strengthUnits,
      weightUnits: this.weightUnits,
      volumeUnits: this.volumeUnits,
      concentrationUnits: this.concentrationUnits
    };

    this.dialog.open(EditFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.TNs.filter = this.searchKey.trim().toLowerCase();
  }
  rowClicked(element) {
    console.log("row clicked", element);
    if (element.TN_Status != 1) {
      this.MasterTNService.getTaskByAICode(element.AI_Code).subscribe(
        response => {
          //open in progress modal
          const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.width = "60%";
          dialogConfig.height = "60%";
          dialogConfig.data = { task: response };
          // this.dialog.open(ProgressComponent, dialogConfig);
        }
      );
    } else {
      this.MasterTNService.getAIMasterFieldStructure().subscribe(response => {
        //open view ai modal

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = "60%";
        dialogConfig.height = "60%";
        //dialogConfig.data = { task: response };
        //this.dialog.open(ViewComponent, dialogConfig);
      });
    }
  }
  clearForm() {
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
    console.log("after clear TN_ActiveIngredients ", xx);
  }
}
