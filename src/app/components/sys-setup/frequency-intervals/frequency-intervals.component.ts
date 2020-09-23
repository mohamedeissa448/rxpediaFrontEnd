import { FrequencyIntervalsFormService } from "./../services/frequency-intervals-form";
import { DurationUnitsFormService } from "./../services/duration-units-form.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatTableDataSource,
  MatDialogConfig
} from "@angular/material";
import { FrequenctIntervalsFormComponent } from "./frequency-intervals-form/frequency-intervals-form.component";

@Component({
  selector: "app-frequency-intervals",
  templateUrl: "./frequency-intervals.component.html",
  styleUrls: ["./frequency-intervals.component.css"]
})
export class FrequencyIntervalComponent implements OnInit {
   frequencyIntervals;
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
    public FrequencyIntervalsFormService: FrequencyIntervalsFormService
  ) {}

  ngOnInit() {
    this.FrequencyIntervalsFormService.getFrequencyIntervals().subscribe(
      (durationUnits: []) => {
        this.isLoading = false;
        this.frequencyIntervals = new MatTableDataSource(durationUnits);
        this.frequencyIntervals.sort = this.sort;
        this.frequencyIntervals.paginator = this.paginator;
      }
    );
  }
  onAdd() {
    this.FrequencyIntervalsFormService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Frequency Interval" };
    this.dialog.open(FrequenctIntervalsFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.FrequencyIntervalsFormService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Frequency Interval" };

    this.dialog.open(FrequenctIntervalsFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.frequencyIntervals.filter = this.searchKey.trim().toLowerCase();
  }
}
