import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormsFormService } from "../../services/forms-form.service";

@Component({
  selector: "app-forms-form",
  templateUrl: "./forms-form.component.html",
  styleUrls: ["./forms-form.component.css"]
})
export class FormsFormComponent implements OnInit {
  title;
  constructor(
    public formsService: FormsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<FormsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.formsService.form.reset();
  }

  onSubmit() {
    if (this.formsService.form.valid) {
      //on adding form
      if (this.title === "Add New Form") {
        this.formsService.addForm(
          this.formsService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Form") {
        //update form
        this.formsService.updateForm(this.formsService.form.value);
        this.notificationService.success(":: Updated Successfully");
      }
      this.formsService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.formsService.form.reset();
    this.dialogRef.close();
  }
}
