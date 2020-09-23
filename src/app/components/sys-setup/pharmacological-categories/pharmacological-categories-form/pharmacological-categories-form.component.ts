import { Component, OnInit, Inject } from "@angular/core";
import { PharmacologicalCategoriesFormService } from "../../services/pharmacological-categories-form.service";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-pharmacological-categories-form",
  templateUrl: "./pharmacological-categories-form.component.html",
  styleUrls: ["./pharmacological-categories-form.component.css"]
})
export class PharmacologicalCategoriesFormComponent implements OnInit {
  title;
  constructor(
    public PharmacologicalCategoriesFormService: PharmacologicalCategoriesFormService,
    private notificationService: NotificationsService,
    private dialogRef: MatDialogRef<PharmacologicalCategoriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.PharmacologicalCategoriesFormService.form.reset();
  }

  onSubmit() {
    if (this.PharmacologicalCategoriesFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Pharmacological Category") {
        this.PharmacologicalCategoriesFormService.addCategory(
          this.PharmacologicalCategoriesFormService.form.value
        );
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Pharmacological Category") {
        //update category
        this.PharmacologicalCategoriesFormService.updateCategory(
          this.PharmacologicalCategoriesFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.PharmacologicalCategoriesFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.PharmacologicalCategoriesFormService.form.reset();
    this.dialogRef.close();
  }
}
