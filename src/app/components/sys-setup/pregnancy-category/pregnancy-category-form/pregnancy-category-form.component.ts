import { PregnancyCategoryFormService } from "./../../services/pregnancy-category-form";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-pregnancy-category-form",
  templateUrl: "./pregnancy-category-form.component.html",
  styleUrls: ["./pregnancy-category-form.component.css"]
})
export class PregnancyCategoryFormComponent implements OnInit {
  title;
  constructor(
    public PregnancyCategoryFormService: PregnancyCategoryFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<PregnancyCategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.PregnancyCategoryFormService.form.reset();
  }

  onSubmit() {
    if (this.PregnancyCategoryFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Pregnancy Category") {
        this.PregnancyCategoryFormService.addPregnancyCategorie(
          this.PregnancyCategoryFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Pregnancy Category") {
        //update dosing
        this.PregnancyCategoryFormService.updatePregnancyCategorie(
          this.PregnancyCategoryFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.PregnancyCategoryFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.PregnancyCategoryFormService.form.reset();
    this.dialogRef.close();
  }
}
