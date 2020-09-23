import { MedicalConditionsFormService } from "./../services/medical-conditions-form.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { MedicalConditionsFormComponent } from "./medical-conditions-form/medical-conditions-form.component";

@Component({
  selector: "app-medical-conditions",
  templateUrl: "./medical-conditions.component.html",
  styleUrls: ["./medical-conditions.component.css"]
})
export class MedicalConditionsComponent implements OnInit {
  medicalConditions;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Name",
    "ICD9",
    "ICD10",
    "Active",
    "Description",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public medicalConditionFormService: MedicalConditionsFormService
  ) {}

  ngOnInit() {
    this.medicalConditionFormService
      .getMedicalConditions()
      .subscribe((conditions: []) => {
        this.isLoading = false;
        this.medicalConditions = new MatTableDataSource(conditions);
        this.medicalConditions.sort = this.sort;
        this.medicalConditions.paginator = this.paginator;
      });
  }
  onAdd() {
    this.medicalConditionFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Medical Condition" };
    this.dialog.open(MedicalConditionsFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.medicalConditionFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Medical Condition" };

    this.dialog.open(MedicalConditionsFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.medicalConditions.filter = this.searchKey.trim().toLowerCase();
  }
}
