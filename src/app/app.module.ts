import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxGalleryModule } from "ngx-gallery";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "./layout/layout.module";

import { SysSetupModule } from "./components/sys-setup/sys-setup.module";
import { DashboardModule } from "./components/dashboard/dashboard.module";

import { ConfirmationDialogComponent } from './layout/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './layout/confirmation-dialog/confirmation-dialog.service';

//import * as $ from 'jquery';
import { from } from "rxjs";
import { AIModule } from "./components/ai/ai.module";
import { ManageTasksModule } from "./components/manage-tasks/manage-tasks.module";
import { TnModule } from "./components/tn/tn.module";

@NgModule({
  declarations: [AppComponent, ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    // Pharmed Modules
    SysSetupModule,
    DashboardModule,
    AIModule,
    TnModule,
    ManageTasksModule,
    // end of pharmed modules
    routing,
    HttpClientModule,
    NgbModule,
    LayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [ConfirmationDialogService],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class AppModule {}
