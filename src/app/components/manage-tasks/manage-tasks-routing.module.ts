import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagingTasksComponent } from "./managing-tasks/managing-tasks.component";

const routes: Routes = [
  {
    path: "manage-tasks",
    children: [
      {
        path: "",
        component: ManagingTasksComponent,
        data: { title: "RxP CMS Manager » Manage Tasks" },
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTasksRoutingModule {}
