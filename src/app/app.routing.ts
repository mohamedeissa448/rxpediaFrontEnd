import { AuthGuardService } from "./authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "sys-setup",
    loadChildren: () =>
      import("../app/components/sys-setup/sys-setup.module").then(
        m => m.SysSetupModule
      )
    //canActivate: [AuthGuardService]
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../app/components/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },
  {
    path: "ai",
    loadChildren: () =>
      import("../app/components/ai/ai.module").then(m => m.AIModule)
  },
  {
    path: "tn",
    loadChildren: () =>
      import("../app/components/tn/tn.module").then(m => m.TnModule)
  },
  {
    path: "my-tasks",
    loadChildren: () =>
      import("../app/components/my-tasks/my-tasks.module").then(
        m => m.MyTasksModule
      )
  },
  {
    path: "manage-tasks",
    loadChildren: () =>
      import("../app/components/manage-tasks/manage-tasks.module").then(
        m => m.ManageTasksModule
      )
  },
  {
    path: "authentication",
    loadChildren: () =>
      import("../app/authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});
