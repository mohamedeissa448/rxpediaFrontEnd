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
import { InteractionAlcoholFormComponent } from "./interaction-alcohol-form/interaction-alcohol-form.component";

@Component({
  selector: "app-interaction-alcohol",
  templateUrl: "./interaction-alcohol.component.html",
  styleUrls: ["./interaction-alcohol.component.css"]
})
export class InteractionAlcoholComponent implements OnInit {
  Alcohols;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Code",
    "Alcohol Name",
    "Description",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public InteractionAlcoholFormService: InteractionAlcoholFormService
  ) {}

  ngOnInit() {
    this.InteractionAlcoholFormService.getAlcohols().subscribe(
      (Alcohols: []) => {
        this.isLoading = false;
        this.Alcohols = new MatTableDataSource(Alcohols);
        this.Alcohols.sort = this.sort;
        this.Alcohols.paginator = this.paginator;
      }
    );
  }
  onAdd() {
    this.InteractionAlcoholFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Alcohol" };
    this.dialog.open(InteractionAlcoholFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.InteractionAlcoholFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Alcohol" };

    this.dialog.open(InteractionAlcoholFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.Alcohols.filter = this.searchKey.trim().toLowerCase();
  }
}
