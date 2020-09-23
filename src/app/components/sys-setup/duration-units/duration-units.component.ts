import { DurationUnitsFormService } from "./../services/duration-units-form.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { DurationUnitsFormComponent } from "./duration-units-form/duration-units-form.component";

@Component({
  selector: "app-duration-units",
  templateUrl: "./duration-units.component.html",
  styleUrls: ["./duration-units.component.css"]
})
export class DurationUnitComponent implements OnInit {
  durationUnits;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Name",
    "Description",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public DurationUnitsFormService: DurationUnitsFormService
  ) {}

  ngOnInit() {
    this.DurationUnitsFormService.getDurationUnits().subscribe(
      (durationUnits: []) => {
        this.isLoading = false;
        this.durationUnits = new MatTableDataSource(durationUnits);
        this.durationUnits.sort = this.sort;
        this.durationUnits.paginator = this.paginator;
      }
    );
  }
  onAdd() {
    this.DurationUnitsFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Duration Unit" };
    this.dialog.open(DurationUnitsFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.DurationUnitsFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Duration Unit" };

    this.dialog.open(DurationUnitsFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.durationUnits.filter = this.searchKey.trim().toLowerCase();
  }
}
