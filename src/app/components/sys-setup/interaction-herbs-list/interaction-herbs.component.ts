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
import { InteractionHerbsFormComponent } from "./interaction-herbs-form/interaction-herbs-form.component";

@Component({
  selector: "app-herbs-list",
  templateUrl: "./interaction-herbs.component.html",
  styleUrls: ["./interaction-herbs.component.css"]
})
export class InteractionHerbsComponent implements OnInit {
  herbsLists;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Code",
    "Herbs Name",
    "Description",
    "Active",
    "Actions"
  ];
  isLoading = true;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public InteractionHerbsFormService: InteractionHerbsFormService
  ) {}

  ngOnInit() {
    this.InteractionHerbsFormService.getHerbsLists().subscribe(
      (herbsLists: []) => {
        this.isLoading = false;
        this.herbsLists = new MatTableDataSource(herbsLists);
        this.herbsLists.sort = this.sort;
        this.herbsLists.paginator = this.paginator;
      }
    );
  }
  onAdd() {
    this.InteractionHerbsFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Herbs List" };
    this.dialog.open(InteractionHerbsFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.InteractionHerbsFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Herbs List" };

    this.dialog.open(InteractionHerbsFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.herbsLists.filter = this.searchKey.trim().toLowerCase();
  }
}
