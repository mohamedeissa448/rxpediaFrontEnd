import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { InteractionHerbsFormService } from "../../services/interaction-herbs-list-form ";

@Component({
  selector: "app-interaction-herbs-form",
  templateUrl: "./interaction-herbs-form.component.html",
  styleUrls: ["./interaction-herbs-form.component.css"]
})
export class InteractionHerbsFormComponent implements OnInit {
  title;
  constructor(
    public InteractionHerbsFormService: InteractionHerbsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<InteractionHerbsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.InteractionHerbsFormService.form.reset();
  }

  onSubmit() {
    if (this.InteractionHerbsFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Herbs List") {
        this.InteractionHerbsFormService.addFoodList(
          this.InteractionHerbsFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Herbs List") {
        //update dosing
        this.InteractionHerbsFormService.updateHerbsList(
          this.InteractionHerbsFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.InteractionHerbsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.InteractionHerbsFormService.form.reset();
    this.dialogRef.close();
  }
}
