import { WeightUnitsFormService } from "./../../services/weight-units-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-weight-units-form",
  templateUrl: "./weight-units-form.component.html",
  styleUrls: ["./weight-units-form.component.css"]
})
export class WeightUnitsFormComponent implements OnInit {
  title;
  constructor(
    public weightUnitsFormService: WeightUnitsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<WeightUnitsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.weightUnitsFormService.form.reset();
  }

  onSubmit() {
    if (this.weightUnitsFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Weight Unit") {
        this.weightUnitsFormService.addWeightUnit(
          this.weightUnitsFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Weight Unit") {
        //update category
        this.weightUnitsFormService.updateWeightUnit(
          this.weightUnitsFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.weightUnitsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.weightUnitsFormService.form.reset();
    this.dialogRef.close();
  }
}
