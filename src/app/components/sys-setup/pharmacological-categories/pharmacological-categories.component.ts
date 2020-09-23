import { PharmacologicalCategoriesFormComponent } from "./pharmacological-categories-form/pharmacological-categories-form.component";
import "rxjs/Rx";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  Sort
} from "@angular/material";
import { PharmacologicalCategoriesFormService } from "../services/pharmacological-categories-form.service";

@Component({
  selector: "app-pharmacological-categories",
  templateUrl: "./pharmacological-categories.component.html",
  styleUrls: ["./pharmacological-categories.component.css"]
})
export class PharmacologicalCategories implements OnInit {
  categories;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Name", "ATC", "Active", "Actions"];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public categoryService: PharmacologicalCategoriesFormService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories: []) => {
      this.isLoading = false;
      this.categories = new MatTableDataSource(categories);
      this.categories.sort = this.sort;
      this.categories.paginator = this.paginator;
    });
  }
  onAdd() {
    this.categoryService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Pharmacological Category" };
    this.dialog.open(PharmacologicalCategoriesFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.categoryService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Pharmacological Category" };

    this.dialog.open(PharmacologicalCategoriesFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.categories.filter = this.searchKey.trim().toLowerCase();
  }
}
