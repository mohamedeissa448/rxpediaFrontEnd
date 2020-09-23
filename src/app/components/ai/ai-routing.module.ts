import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "../../authentication/services/auth-guard.service";
import { CanDeactivateServiceMasterAIEditClinicalData } from "../../services/can-deactivate-master-ai-edit-clinical-data.service";

import { MasterAiComponent } from "./master-ai/master-ai.component";
import { MasterAIEditClinicalDataComponent } from "./master-ai-edit-clinical-data/master-ai-edit-clinical-data.component"
import { from } from 'rxjs';
import { MasterAiReviewClinicalDataComponent } from './master-ai-review-clinical-data/master-ai-review-clinical-data.component';
import { MasterAiGrammerClinicalDataComponent } from './master-ai-grammer-clinical-data/master-ai-grammer-clinical-data.component';
import { MasterAiPublishClinicalDataComponent } from './master-ai-publish-clinical-data/master-ai-publish-clinical-data.component';

const routes: Routes = [
  {
    path: "ai",
    children: [
      {
        path: "master-ai",
        component: MasterAiComponent,
        data: { title: "RxP CMS Manager » Databases » Master AI" },
        canActivate: [AuthGuardService]
      },
      {
        path: "master-ai-edit-clinical-data/:ainame",
        component: MasterAIEditClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master AI » Edit AI Clinical Data", 
          PageTitle: "Master AI - Edit Clinical Data", 
          Breadcrumb: "Master AI"
        },
        canDeactivate:[CanDeactivateServiceMasterAIEditClinicalData],
        canActivate: [AuthGuardService]
      },
      {
        path: "master-ai-review-clinical-data/:ainame",
        component: MasterAiReviewClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master AI » Review AI Clinical Data", 
          PageTitle: "Master AI - Review Clinical Data", 
          Breadcrumb: "Master AI"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "master-ai-grammer-clinical-data/:ainame",
        component: MasterAiGrammerClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master AI » Grammer Review AI Clinical Data", 
          PageTitle: "Master AI -Grammer Review Clinical Data", 
          Breadcrumb: "Master AI"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "master-ai-publish-clinical-data/:ainame",
        component: MasterAiPublishClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master AI » Publish Review AI Clinical Data", 
          PageTitle: "Master AI - Publish Review Clinical Data", 
          Breadcrumb: "Master AI"
        },
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AIRoutingModule {}
