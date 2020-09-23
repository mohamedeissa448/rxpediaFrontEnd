import { MasterTnService } from "./services/master-tn.service";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TnRoutingModule } from "./tn-routing.module";
import { MasterTnComponent } from "./master-tn/master-tn.component";
import { MasterTnFormComponent } from "./master-tn/master-tn-form/master-tn-form.component";
//angular material
import { MatChipsModule } from "@angular/material/chips";

import {
  MatCardModule,
   MatProgressBarModule,
  MatDatepickerModule,
  MatDividerModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatTableModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
} from "@angular/material";
import { AIRoutingModule } from "../ai/ai-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { EditFormComponent } from "./master-tn/edit-form/edit-form.component";
import { MasterTnEditOriginalDataComponent } from './master-tn-edit-original-data/master-tn-edit-original-data.component';
import { MasterTnReviewOriginalDataComponent } from './master-tn-review-original-data/master-tn-review-original-data.component';
import { MasterTnPublishOriginalDataComponent } from './master-tn-publish-original-data/master-tn-publish-original-data.component';
import { MasterTnEditClinicalDataComponent } from './master-tn-edit-clinical-data/master-tn-edit-clinical-data.component';
import { MasterTnReviewClinicalDataComponent } from './master-tn-review-clinical-data/master-tn-review-clinical-data.component';
import { MasterTnGrammerClinicalDataComponent } from './master-tn-grammer-clinical-data/master-tn-grammer-clinical-data.component';
import { MasterTnPublishClinicalDataComponent } from './master-tn-publish-clinical-data/master-tn-publish-clinical-data.component';
import { MasterTnEditNonClinicalDataComponent } from './master-tn-edit-non-clinical-data/master-tn-edit-non-clinical-data.component';
import { MasterTnReviewNonClinicalDataComponent } from './master-tn-review-non-clinical-data/master-tn-review-non-clinical-data.component';
import { MasterTnPublishNonClinicalDataComponent } from './master-tn-publish-non-clinical-data/master-tn-publish-non-clinical-data.component';
import { ViewCommentsComponent } from './view-comments/view-comments.component';

@NgModule({
  declarations: [MasterTnComponent, MasterTnFormComponent, EditFormComponent, MasterTnEditOriginalDataComponent, MasterTnReviewOriginalDataComponent, MasterTnPublishOriginalDataComponent, MasterTnEditClinicalDataComponent, MasterTnReviewClinicalDataComponent, MasterTnGrammerClinicalDataComponent, MasterTnPublishClinicalDataComponent, MasterTnEditNonClinicalDataComponent, MasterTnReviewNonClinicalDataComponent, MasterTnPublishNonClinicalDataComponent, ViewCommentsComponent],
  imports: [
    CommonModule,
    TnRoutingModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatAutocompleteModule,
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
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule
  ],
  entryComponents: [MasterTnFormComponent, EditFormComponent,ViewCommentsComponent],
  providers: [MasterTnService]
})
export class TnModule {}
