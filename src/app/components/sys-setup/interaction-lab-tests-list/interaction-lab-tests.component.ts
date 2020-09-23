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
import { InteractionLabFormComponent } from "./interaction-lab-tests-form/interaction-lab-tests-form.component";

@Component({
  selector: "app-lab-list",
  templateUrl: "./interaction-lab-tests.component.html",
  styleUrls: ["./interaction-lab-tests.component.css"]
})
export class InteractionLabComponent implements OnInit {
  labLists;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Code",
    "LabTests Name",
    "Description",
    "Active",
    "Actions"
  ];
  isLoading = true;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public InteractionLabFormService: InteractionLabFormService
  ) {}

  ngOnInit() {
    this.InteractionLabFormService.getHerbsLists().subscribe((labLists: []) => {
      this.isLoading = false;
      this.labLists = new MatTableDataSource(labLists);
      this.labLists.sort = this.sort;
      this.labLists.paginator = this.paginator;
    });
  }
  onAdd() {
    this.InteractionLabFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Lab List" };
    this.dialog.open(InteractionLabFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.InteractionLabFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Lab List" };

    this.dialog.open(InteractionLabFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.labLists.filter = this.searchKey.trim().toLowerCase();
  }
}
