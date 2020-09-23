import { LactationCategoryFormService } from "./../../services/lactation-category-form";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-lactation-category-form",
  templateUrl: "./lactation-category-form.component.html",
  styleUrls: ["./lactation-category-form.component.css"]
})
export class LactationCategoryFormComponent implements OnInit {
  title;
  constructor(
    public LactationCategoryFormService: LactationCategoryFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<LactationCategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.LactationCategoryFormService.form.reset();
  }

  onSubmit() {
    if (this.LactationCategoryFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Lactation Category") {
        this.LactationCategoryFormService.addLactationCategory(
          this.LactationCategoryFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Lactation Category") {
        //update dosing
        this.LactationCategoryFormService.updateLactationCategory(
          this.LactationCategoryFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.LactationCategoryFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.LactationCategoryFormService.form.reset();
    this.dialogRef.close();
  }
}
