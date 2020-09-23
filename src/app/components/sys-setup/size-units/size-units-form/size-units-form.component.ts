import { SizeUnitsFormService } from "./../../services/size-units-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-size-units-form",
  templateUrl: "./size-units-form.component.html",
  styleUrls: ["./size-units-form.component.css"]
})
export class SizeUnitsFormComponent implements OnInit {
  title;
  constructor(
    public sizeUnitsFormService: SizeUnitsFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<SizeUnitsFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.sizeUnitsFormService.form.reset();
  }

  onSubmit() {
    if (this.sizeUnitsFormService.form.valid) {
      //on adding unit
      if (this.title === "Add New Size Unit") {
        this.sizeUnitsFormService.addSizeUnit(
          this.sizeUnitsFormService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Size Unit") {
        //update unit
        this.sizeUnitsFormService.updateSizeUnit(
          this.sizeUnitsFormService.form.value
        );
        this.notificationService.success(":: Updated Successfully");
      }
      this.sizeUnitsFormService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.sizeUnitsFormService.form.reset();
    this.dialogRef.close();
  }
}
