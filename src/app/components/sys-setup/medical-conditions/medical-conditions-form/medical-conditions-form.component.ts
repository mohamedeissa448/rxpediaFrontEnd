import { MedicalConditionsFormService } from "./../../services/medical-conditions-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-medical-conditions-form",
  templateUrl: "./medical-conditions-form.component.html",
  styleUrls: ["./medical-conditions-form.component.css"]
})
export class MedicalConditionsFormComponent implements OnInit {
  title;
  constructor(
    public medicalConditionsFormService: MedicalConditionsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<MedicalConditionsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.medicalConditionsFormService.form.reset();
  }

  onSubmit() {
    if (this.medicalConditionsFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Medical Condition") {
        /*this.medicalConditionsFormService.addCategory(
        this.medicalConditionsFormService.form.value
      ).subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Medical Condition") {
        //update condition
        this.medicalConditionsFormService.updateMedicalCondition(
          this.medicalConditionsFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.medicalConditionsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.medicalConditionsFormService.form.reset();
    this.dialogRef.close();
  }
}
