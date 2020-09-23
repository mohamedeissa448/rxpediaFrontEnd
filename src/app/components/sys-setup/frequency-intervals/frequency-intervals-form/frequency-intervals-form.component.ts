import { FrequencyIntervalsFormService } from "./../../services/frequency-intervals-form";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-frequency-intervals-form",
  templateUrl: "./frequency-intervals-form.component.html",
  styleUrls: ["./frequency-intervals-form.component.css"]
})
export class FrequenctIntervalsFormComponent implements OnInit {
  title;
  constructor(
    public frequencyIntervalsFormService: FrequencyIntervalsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<FrequenctIntervalsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.frequencyIntervalsFormService.form.reset();
  }

  onSubmit() {
    if (this.frequencyIntervalsFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Frequency Interval") {
        this.frequencyIntervalsFormService.addFrequencyInterval(
          this.frequencyIntervalsFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Frequency Interval") {
        //update dosing
        this.frequencyIntervalsFormService.updateFrequencyInterval(
          this.frequencyIntervalsFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.frequencyIntervalsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.frequencyIntervalsFormService.form.reset();
    this.dialogRef.close();
  }
}
