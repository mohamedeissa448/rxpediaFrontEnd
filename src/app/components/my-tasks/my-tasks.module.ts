import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyTasksRoutingModule } from "./my-tasks-routing.module";
import { UserTasksComponent } from "./user-tasks/user-tasks.component";
import { HttpClientModule } from "@angular/common/http";
//angular material
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { EditAiClinicalComponent } from "./edit-ai-clinical/edit-ai-clinical.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
//tinymce editor
import { EditorModule } from "@tinymce/tinymce-angular";
@NgModule({
  declarations: [UserTasksComponent, EditAiClinicalComponent],
  imports: [
    CommonModule,
    MyTasksRoutingModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MyTasksModule {}
