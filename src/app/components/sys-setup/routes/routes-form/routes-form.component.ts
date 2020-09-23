import { RoutesFormService } from "./../../services/routes-form.service";
import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-routes-form",
  templateUrl: "./routes-form.component.html",
  styleUrls: ["./routes-form.component.css"]
})
export class RoutesFormComponent implements OnInit {
  title;
  constructor(
    public RoutesService: RoutesFormService,
    public notificationService: NotificationsService,
    public dialogRef: MatDialogRef<RoutesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {}
  onClear() {
    this.RoutesService.form.reset();
  }

  onSubmit() {
    if (this.RoutesService.form.valid) {
      //on adding category
      if (this.title === "Add New Route") {
        this.RoutesService.addRoute(
          this.RoutesService.form.value
        ); /*.subscribe(() => {});*/
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit Route") {
        //update category
        this.RoutesService.updateRoute(this.RoutesService.form.value);
        this.notificationService.success(":: Updated Successfully");
      }
      this.RoutesService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.RoutesService.form.reset();
    this.dialogRef.close();
  }
}
