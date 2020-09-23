import { LactationCategoryFormService } from "./../services/lactation-category-form";
import { PregnancyCategoryFormService } from "./../services/pregnancy-category-form";
import { InteractionAlcoholFormService } from "./../services/interaction-alcohol-ltobacco-form";
import { InteractionLabFormService } from "./../services/interaction-lab-list-form";
import { InteractionHerbsFormService } from "./../services/interaction-herbs-list-form ";
import { InteractionFoodFormService } from "./../services/interaction-food-list-form";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { LactationCategoryFormComponent } from "./lactation-category-form/lactation-category-form.component";

@Component({
  selector: "app-lactation-category",
  templateUrl: "./lactation-category.component.html",
  styleUrls: ["./lactation-category.component.css"]
})
export class LactationCategoryComponent implements OnInit {
  lactationCategories;
  data;
  searchKey: string;
  displayedColumns: string[] = ["Name", "Description", "Actions"];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public LactationCategoryFormService: LactationCategoryFormService
  ) {}

  ngOnInit() {
    this.LactationCategoryFormService.getLactationCategories().subscribe(
      (lactations: []) => {
        this.isLoading = false;
        this.lactationCategories = new MatTableDataSource(lactations);
        this.lactationCategories.sort = this.sort;
        this.lactationCategories.paginator = this.paginator;
      }
    );
  }
  onAdd() {
    this.LactationCategoryFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Lactation Category" };
    this.dialog.open(LactationCategoryFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.LactationCategoryFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Lactation Category" };

    this.dialog.open(LactationCategoryFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    if (this.searchKey)
      this.lactationCategories.filter = this.searchKey.trim().toLowerCase();
  }
}
