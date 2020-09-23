import { StrengthUnitsFormComponent } from "./strength-units-form/strength-units-form.component";
import { StrengthUnitsFormService } from "./../services/strength-units-form.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";

@Component({
  selector: "app-strength-units",
  templateUrl: "./strength-units.component.html",
  styleUrls: ["./strength-units.component.css"]
})
export class StrengthUnitsComponent implements OnInit {
  strengthUnits;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Name", "ATC", "Active", "Actions"];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public strengthUnitsService: StrengthUnitsFormService
  ) {}

  ngOnInit() {
    this.strengthUnitsService.getStrengthUnits().subscribe((units: []) => {
      this.isLoading = false;
      this.strengthUnits = new MatTableDataSource(units);
      this.strengthUnits.sort = this.sort;
      this.strengthUnits.paginator = this.paginator;
    });
  }
  onAdd() {
    this.strengthUnitsService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Strength Unit" };
    this.dialog.open(StrengthUnitsFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.strengthUnitsService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Strength Unit" };

    this.dialog.open(StrengthUnitsFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.strengthUnits.filter = this.searchKey.trim().toLowerCase();
  }
}
