import { DoseTypesFormService } from "./../services/dosing-types-form.service";
import { DosingAgeFormService } from "./../services/dosing-age-form.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { DoseTypeFormComponent } from "./dose-type-form/dose-type-form.component";

@Component({
  selector: "app-dose-types",
  templateUrl: "./dose-type.component.html",
  styleUrls: ["./dose-type.component.css"]
})
export class DoseTypeComponent implements OnInit {
  doseTypes;
  data;
  searchKey: string;
  isLoading = true;
  displayedColumns: string[] = [
    "Name",
    "Description",
    "Active",
    "Actions"
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public DoseTypeFormService: DoseTypesFormService
  ) {}

  ngOnInit() {
    this.DoseTypeFormService.geteDoseType().subscribe((dosingTypes: []) => {
      this.isLoading = false;
      this.doseTypes = new MatTableDataSource(dosingTypes);
      this.doseTypes.sort = this.sort;
      this.doseTypes.paginator = this.paginator;
    });
  }
  onAdd() {
    this.DoseTypeFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Dose Type" };
    this.dialog.open(DoseTypeFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.DoseTypeFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Dose Type" };

    this.dialog.open(DoseTypeFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.doseTypes.filter = this.searchKey.trim().toLowerCase();
  }
}
