import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { InteractionLabFormService } from "../../services/interaction-lab-list-form";

@Component({
  selector: "app-interaction-lab-tests-form",
  templateUrl: "./interaction-lab-tests-form.component.html",
  styleUrls: ["./interaction-lab-tests-form.component.css"]
})
export class InteractionLabFormComponent implements OnInit {
  title;
  constructor(
    public InteractionLabFormService: InteractionLabFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<InteractionLabFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.InteractionLabFormService.form.reset();
  }

  onSubmit() {
    if (this.InteractionLabFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Lab List") {
        this.InteractionLabFormService.addFoodList(
          this.InteractionLabFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Lab List") {
        //update dosing
        this.InteractionLabFormService.updateHerbsList(
          this.InteractionLabFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.InteractionLabFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.InteractionLabFormService.form.reset();
    this.dialogRef.close();
  }
}
