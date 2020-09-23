import { InteractionAlcoholFormService } from "./../../services/interaction-alcohol-ltobacco-form";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-interaction-alcohol-form",
  templateUrl: "./interaction-alcohol-form.component.html",
  styleUrls: ["./interaction-alcohol-form.component.css"]
})
export class InteractionAlcoholFormComponent implements OnInit {
  title;
  constructor(
    public InteractionAlcoholFormService: InteractionAlcoholFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<InteractionAlcoholFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.InteractionAlcoholFormService.form.reset();
  }

  onSubmit() {
    if (this.InteractionAlcoholFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Alcohol") {
        this.InteractionAlcoholFormService.addAlcohol(
          this.InteractionAlcoholFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Alcohol") {
        //update dosing
        this.InteractionAlcoholFormService.updateAlcohol(
          this.InteractionAlcoholFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.InteractionAlcoholFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.InteractionAlcoholFormService.form.reset();
    this.dialogRef.close();
  }
}
