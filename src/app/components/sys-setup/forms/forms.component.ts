import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { FormsFormService } from "../services/forms-form.service";
import { FormsFormComponent } from "./forms-form/forms-form.component";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.component.html",
  styleUrls: ["./forms.component.css"]
})
export class Forms implements OnInit {
  PharmacologicalCategories;
  forms;
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
    public formsService: FormsFormService
  ) {}

  ngOnInit() {
    this.formsService.getForms().subscribe((forms: []) => {
      this.isLoading = false;
      this.forms = new MatTableDataSource(forms);
      this.forms.sort = this.sort;
      this.forms.paginator = this.paginator;
    });
  }
  onAdd() {
    this.formsService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Form" };
    this.dialog.open(FormsFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.formsService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Form" };

    this.dialog.open(FormsFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.forms.filter = this.searchKey.trim().toLowerCase();
  }
}
