import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule, MatNativeDateModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AIRoutingModule } from "./ai-routing.module";
import { MasterAiComponent } from "./master-ai/master-ai.component";
import { MasterAIEditClinicalDataComponent } from "./master-ai-edit-clinical-data/master-ai-edit-clinical-data.component";
import { MasterAiFormComponent } from "./master-ai/master-ai-form/master-ai-form.component";
import { InteractionAddFormComponent } from "./master-ai-edit-clinical-data/interaction-add-form/interaction-add-form.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { MatSelectModule } from "@angular/material";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ProgressComponent } from "./ai-status-view/progress/progress.component";
import { AIViewComponent } from "./ai-status-view/view/view.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { EditorModule ,TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { MatListModule } from "@angular/material/list";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ItemSelectChangerDirective } from "../../directives/item-select-changer.directive";
import { DosingAddFormComponent } from "./master-ai-edit-clinical-data/dosing-add-form/dosing-add-form.component";
import { InteractionEditFormComponent } from "./master-ai-edit-clinical-data/interaction-edit-form/interaction-edit-form.component";
import { MasterAiReviewClinicalDataComponent } from './master-ai-review-clinical-data/master-ai-review-clinical-data.component';
import { MasterAiGrammerClinicalDataComponent } from './master-ai-grammer-clinical-data/master-ai-grammer-clinical-data.component';
import { MasterAiPublishClinicalDataComponent } from './master-ai-publish-clinical-data/master-ai-publish-clinical-data.component';
import { CommentComponent } from './comment/comment.component';
import { DosingEditFormComponent } from './master-ai-edit-clinical-data/dosing-edit-form/edit-dosing-form.component';
import { ViewMasterAiClinicalDataComponent } from './view-ai/master-ai-clinical-data/master-ai-clinical-data.component';
import { RevisionDataComponent } from './view-ai/revision-data/revision-data.component';

@NgModule({
  declarations: [
    MasterAiComponent,
    InteractionAddFormComponent,
    MasterAiFormComponent,
    MasterAIEditClinicalDataComponent,
    ProgressComponent,
    AIViewComponent,
    ItemSelectChangerDirective,
    DosingAddFormComponent,
    InteractionEditFormComponent,
    MasterAiReviewClinicalDataComponent,
    MasterAiGrammerClinicalDataComponent,
    MasterAiPublishClinicalDataComponent,
    CommentComponent,
    DosingEditFormComponent,
    ViewMasterAiClinicalDataComponent,
    ViewMasterAiClinicalDataComponent,
    RevisionDataComponent
  ],
  imports: [
    NgbModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatChipsModule,
    AIRoutingModule,
    BrowserModule,
    CommonModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    EditorModule,
    MatListModule,
    MatButtonModule
  ],
  entryComponents: [
    MasterAiFormComponent,
    ProgressComponent,
    AIViewComponent,
    InteractionAddFormComponent,
    DosingAddFormComponent,
    InteractionEditFormComponent,
    CommentComponent,
    DosingEditFormComponent
  ],exports: [
    ViewMasterAiClinicalDataComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AIModule {}
