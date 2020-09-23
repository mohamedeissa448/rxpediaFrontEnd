import { DoseUnitsFormService } from "./../../services/dose-units-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-dose-units-form",
  templateUrl: "./dose-units-form.component.html",
  styleUrls: ["./dose-units-form.component.css"]
})
export class DoseUnitFormComponent implements OnInit {
  title;
  constructor(
    public doseUnitsFormService: DoseUnitsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<DoseUnitFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.doseUnitsFormService.form.reset();
  }

  onSubmit() {
    if (this.doseUnitsFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Dose Unit") {
        this.doseUnitsFormService.addDoseUnit(
          this.doseUnitsFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Dose Unit") {
        //update dosing
        this.doseUnitsFormService.updateDoseUnit(
          this.doseUnitsFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.doseUnitsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.doseUnitsFormService.form.reset();
    this.dialogRef.close();
  }
}
