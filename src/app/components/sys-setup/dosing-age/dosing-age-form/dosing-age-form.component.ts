import { DosingAgeFormService } from "./../../services/dosing-age-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-dosing-age-form",
  templateUrl: "./dosing-age-form.component.html",
  styleUrls: ["./dosing-age-form.component.css"]
})
export class DosingAgeFormComponent implements OnInit {
  title;
  constructor(
    public dosingAgesFormService: DosingAgeFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<DosingAgeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.dosingAgesFormService.form.reset();
  }

  onSubmit() {
    if (this.dosingAgesFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Dosing Age") {
        this.dosingAgesFormService.addDosingAge(
          this.dosingAgesFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Dosing Age") {
        //update dosing
        this.dosingAgesFormService.updateDosingAge(
          this.dosingAgesFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.dosingAgesFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.dosingAgesFormService.form.reset();
    this.dialogRef.close();
  }
}
