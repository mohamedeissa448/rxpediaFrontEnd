import { Component, OnInit, Inject } from "@angular/core";
import { VolumeUnitsFormService } from "../../services/volume-units-form.service";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-volume-units-form",
  templateUrl: "./volume-units-form.component.html",
  styleUrls: ["./volume-units-form.component.css"]
})
export class VolumeUnitsFormComponent implements OnInit {
  title;
  constructor(
    public volumeUnitsFormService: VolumeUnitsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<VolumeUnitsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.volumeUnitsFormService.form.reset();
  }

  onSubmit() {
    if (this.volumeUnitsFormService.form.valid) {
      //on adding category
      if (this.title === "Add New Volume Unit") {
        /*this.PharmacologicalCategoriesFormService.addCategory(
        this.PharmacologicalCategoriesFormService.form.value
      ).subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Volume Unit") {
        //update category
        this.volumeUnitsFormService.updateVolumeUnit(
          this.volumeUnitsFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.volumeUnitsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.volumeUnitsFormService.form.reset();
    this.dialogRef.close();
  }
}
