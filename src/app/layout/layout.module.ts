import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MyTaskComponent } from "./sidebar/tasks/tasks.component";

import { PageLoaderComponent } from "./page-loader/page-loader.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [CommonModule, NgbModule, RouterModule, MatListModule],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PageLoaderComponent,
    MyTaskComponent,
    NotificationComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PageLoaderComponent,
    MyTaskComponent
  ]
})
export class LayoutModule {}
