import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserTasksComponent } from "./user-tasks/user-tasks.component";
import { AuthGuardService } from "../../authentication/services/auth-guard.service";
import { EditAiClinicalComponent } from "./edit-ai-clinical/edit-ai-clinical.component";

const routes: Routes = [
  {
    path: "my-tasks",
    children: [
      {
        path: "",
        component: UserTasksComponent,
        data: { title: "RxP CMS Manager » My Tasks » My Tasks" },
        canActivate: [AuthGuardService]
      },
      {
        path: "edit-ai-master-clinical-data",
        component: EditAiClinicalComponent,
        data: { title: "RxP CMS Manager » Master AI » Edit AI Clinical Data" },
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTasksRoutingModule {}
