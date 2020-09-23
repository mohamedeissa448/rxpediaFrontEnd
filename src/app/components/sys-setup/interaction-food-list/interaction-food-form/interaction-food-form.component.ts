import { InteractionFoodFormService } from "./../../services/interaction-food-list-form";
import { FrequencyIntervalsFormService } from "./../../services/frequency-intervals-form";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-interaction-food-form",
  templateUrl: "./interaction-food-form.component.html",
  styleUrls: ["./interaction-food-form.component.css"]
})
export class InteractionFoodFormComponent implements OnInit {
  title;
  constructor(
    public InteractionFoodFormService: InteractionFoodFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<InteractionFoodFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.InteractionFoodFormService.form.reset();
  }

  onSubmit() {
    if (this.InteractionFoodFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Food List") {
        this.InteractionFoodFormService.addFoodList(
          this.InteractionFoodFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Food List") {
        //update dosing
        this.InteractionFoodFormService.updateFoodList(
          this.InteractionFoodFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.InteractionFoodFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.InteractionFoodFormService.form.reset();
    this.dialogRef.close();
  }
}
