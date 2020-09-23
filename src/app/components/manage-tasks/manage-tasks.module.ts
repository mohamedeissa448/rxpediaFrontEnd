import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManageTasksRoutingModule } from "./manage-tasks-routing.module";
import { ManagingTasksComponent } from "./managing-tasks/managing-tasks.component";
import { HttpClientModule } from "@angular/common/http";
//angular material
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { ChangeOwnerFormComponent } from "./managing-tasks/change-owner-form/change-owner-form.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ManagingTasksComponent, ChangeOwnerFormComponent],
  imports: [
    CommonModule,
    ManageTasksRoutingModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  entryComponents: [ChangeOwnerFormComponent]
})
export class ManageTasksModule {}
