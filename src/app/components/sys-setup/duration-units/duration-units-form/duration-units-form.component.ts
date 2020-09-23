import { DurationUnitsFormService } from "./../../services/duration-units-form.service";
import { DoseUnitsFormService } from "./../../services/dose-units-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-duration-units-form",
  templateUrl: "./duration-units-form.component.html",
  styleUrls: ["./duration-units-form.component.css"]
})
export class DurationUnitsFormComponent implements OnInit {
  title;
  constructor(
    public durationUnitsFormService: DurationUnitsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<DurationUnitsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.durationUnitsFormService.form.reset();
  }

  onSubmit() {
    if (this.durationUnitsFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Duration Unit") {
        this.durationUnitsFormService.addDurationUnit(
          this.durationUnitsFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Duration Unit") {
        //update dosing
        this.durationUnitsFormService.updateDurationUnit(
          this.durationUnitsFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.durationUnitsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.durationUnitsFormService.form.reset();
    this.dialogRef.close();
  }
}
