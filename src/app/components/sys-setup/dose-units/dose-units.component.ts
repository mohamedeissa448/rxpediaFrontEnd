import { DoseUnitsFormService } from "./../services/dose-units-form.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { DoseUnitFormComponent } from "./dose-units-form/dose-units-form.component";

@Component({
  selector: "app-dose-units",
  templateUrl: "./dose-units.component.html",
  styleUrls: ["./dose-units.component.css"]
})
export class DoseUnitComponent implements OnInit {
  doseUnits;
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
    public DoseUnitFormService: DoseUnitsFormService
  ) {}

  ngOnInit() {
    this.DoseUnitFormService.getDoseUnits().subscribe((dosingUnits: []) => {
      this.isLoading = false;
      this.doseUnits = new MatTableDataSource(dosingUnits);
      this.doseUnits.sort = this.sort;
      this.doseUnits.paginator = this.paginator;
    });
  }
  onAdd() {
    this.DoseUnitFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Dose Unit" };
    this.dialog.open(DoseUnitFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.DoseUnitFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Dose Unit" };

    this.dialog.open(DoseUnitFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.doseUnits.filter = this.searchKey.trim().toLowerCase();
  }
}
