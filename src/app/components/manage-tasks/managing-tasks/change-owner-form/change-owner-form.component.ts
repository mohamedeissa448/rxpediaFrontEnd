import { ManageService } from "./../../services/manage.service";
import { NotificationsService } from "./../../../sys-setup/services/notifications.service";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-change-owner-form",
  templateUrl: "./change-owner-form.component.html",
  styleUrls: ["./change-owner-form.component.css"]
})
export class ChangeOwnerFormComponent {
  constructor(
    private manageService: ManageService,
    private notificationService: NotificationsService,
    private dialogRef: MatDialogRef<ChangeOwnerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  submit(f) {
    f["Task_Code"] = this.data["Task_Code"];
    this.manageService.ChangeTask(f).subscribe(response => {
      if (response["message"] == true) {
        this.notificationService.success("Assigned Successfully");
      } else {
        this.notificationService.failed("Sorry,Operation Failed!");
      }
    });
    this.onClose();
  }
  onClose() {
    console.log("closed");
    this.dialogRef.close();
  }
}
