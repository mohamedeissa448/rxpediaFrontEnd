import { StrengthUnitsFormService } from "./../../services/strength-units-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-strength-units-form",
  templateUrl: "./strength-units-form.component.html",
  styleUrls: ["./strength-units-form.component.css"]
})
export class StrengthUnitsFormComponent implements OnInit {
  title;
  constructor(
    public strengthUnitsService: StrengthUnitsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<StrengthUnitsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.strengthUnitsService.form.reset();
  }

  onSubmit() {
    if (this.strengthUnitsService.form.valid) {
      //on adding strength unit
      if (this.title === "Add New Strength Unit") {
        this.strengthUnitsService
          .addStrengthUnit(this.strengthUnitsService.form.value)
          .subscribe(() => {});
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Strength Unit") {
        //update strength unit
        this.strengthUnitsService
          .updateStrengthUnit(this.strengthUnitsService.form.value)
          .subscribe(() => {});
        this.notificationService.success(":: Updated Successfully");
      }
      this.strengthUnitsService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.strengthUnitsService.form.reset();
    this.dialogRef.close();
  }
}
