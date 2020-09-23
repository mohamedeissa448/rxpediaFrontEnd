import { DosingAgeFormService } from "./../services/dosing-age-form.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { DosingAgeFormComponent } from "./dosing-age-form/dosing-age-form.component";

@Component({
  selector: "app-dosing-age",
  templateUrl: "./dosing-age.component.html",
  styleUrls: ["./dosing-age.component.css"]
})
export class DosingAgeComponent implements OnInit {
  dosingAges;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Dosing Age Category Name",
    "Description",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public DosingAgeFormService: DosingAgeFormService
  ) {}

  ngOnInit() {
    this.DosingAgeFormService.getDosingAges().subscribe((dosingAges: []) => {
      this.isLoading = false;
      this.dosingAges = new MatTableDataSource(dosingAges);
      this.dosingAges.sort = this.sort;
      this.dosingAges.paginator = this.paginator;
    });
  }
  onAdd() {
    this.DosingAgeFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Dosing Age" };
    this.dialog.open(DosingAgeFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.DosingAgeFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Dosing Age" };

    this.dialog.open(DosingAgeFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dosingAges.filter = this.searchKey.trim().toLowerCase();
  }
}
