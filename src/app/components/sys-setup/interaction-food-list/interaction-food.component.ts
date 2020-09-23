import { InteractionFoodFormService } from "./../services/interaction-food-list-form";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { InteractionFoodFormComponent } from "./interaction-food-form/interaction-food-form.component";

@Component({
  selector: "app-food-list",
  templateUrl: "./interaction-food.component.html",
  styleUrls: ["./interaction-food.component.css"]
})
export class InteractionFoodComponent implements OnInit {
  foodLists;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Code",
    "Food Name",
    "Description",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public InteractionFoodFormService: InteractionFoodFormService
  ) {}

  ngOnInit() {
    this.InteractionFoodFormService.getFoodLists().subscribe(
      (durationUnits: []) => {
        this.isLoading = false;
        this.foodLists = new MatTableDataSource(durationUnits);
        this.foodLists.sort = this.sort;
        this.foodLists.paginator = this.paginator;
      }
    );
  }
  onAdd() {
    this.InteractionFoodFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Food List" };
    this.dialog.open(InteractionFoodFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.InteractionFoodFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Food List" };

    this.dialog.open(InteractionFoodFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.foodLists.filter = this.searchKey.trim().toLowerCase();
  }
}
