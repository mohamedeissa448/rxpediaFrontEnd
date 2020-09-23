import { MasterTnComponent } from "./master-tn/master-tn.component";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
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

const routes: Routes = [
  {
    path: "tn",
    children: [
      {
        path: "manage-master-tn",
        component: MasterTnComponent,
        data: { title: "RxP CMS Manager » Databases » Master TN" },
        canActivate: [AuthGuardService]
      },
      {
        path: "master-tn-edit-original-data/:TNname",
        component:MasterTnEditOriginalDataComponent ,
        data: { 
          title: "RxP CMS Manager » Master TN » Edit TN Original Data", 
          PageTitle: "Master TN - Edit Original Data", 
          Breadcrumb: "Master TN"
        },
        //canDeactivate:[CanDeactivateServiceMasterAIEditOriginalData],
        canActivate: [AuthGuardService]
      },
      {
        path: "master-tn-review-original-data/:TNname",
        component: MasterTnReviewOriginalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master TN » Review TN Original Data", 
          PageTitle: "Master TN - Review Original Data", 
          Breadcrumb: "Master TN"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "master-tn-publish-original-data/:TNname",
        component: MasterTnPublishOriginalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master TN » Publish Review TN Original Data", 
          PageTitle: "Master TN -Publish Review Original Data", 
          Breadcrumb: "Master TN"
        },
        canActivate: [AuthGuardService]
      },
      ///////
      {
        path: "master-tn-edit-clinical-data/:TNname",
        component:MasterTnEditClinicalDataComponent ,
        data: { 
          title: "RxP CMS Manager » Master TN » Edit TN Clinical Data", 
          PageTitle: "Master TN - Edit Clinical Data", 
          Breadcrumb: "Master TN"
        },
        //canDeactivate:[CanDeactivateServiceMasterAIEditclinicalData],
        canActivate: [AuthGuardService]
      },
      {
        path: "master-tn-review-clinical-data/:TNname",
        component: MasterTnReviewClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master TN » Review TN Clinical Data", 
          PageTitle: "Master TN - Review Clinical Data", 
          Breadcrumb: "Master TN"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "master-tn-grammer-clinical-data/:TNname",
        component: MasterTnGrammerClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master TN » Grammer Review TN Clinical Data", 
          PageTitle: "Master TN -Grammer Review Clinical Data", 
          Breadcrumb: "Master TN"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "master-tn-publish-clinical-data/:TNname",
        component: MasterTnPublishClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master TN » Publish Review TN clinical Data", 
          PageTitle: "Master TN -Publish Review clinical Data", 
          Breadcrumb: "Master TN"
        },
        canActivate: [AuthGuardService]
      },
      /////////
      {
        path: "master-tn-edit-non-clinical-data/:TNname",
        component:MasterTnEditNonClinicalDataComponent ,
        data: { 
          title: "RxP CMS Manager » Master TN » Edit TN Non Clinical Data", 
          PageTitle: "Master TN - Edit Non Clinical Data", 
          Breadcrumb: "Master TN"
        },
        //canDeactivate:[CanDeactivateServiceMasterAIEditNon ClinicalData],
        canActivate: [AuthGuardService]
      },
      {
        path: "master-tn-review-non-clinical-data/:TNname",
        component: MasterTnReviewNonClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master TN » Review TN Non Clinical Data", 
          PageTitle: "Master TN - Review Non Clinical Data", 
          Breadcrumb: "Master TN"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "master-tn-publish-non-clinical-data/:TNname",
        component:  MasterTnPublishNonClinicalDataComponent,
        data: { 
          title: "RxP CMS Manager » Master TN » Publish Review TN Non Clinical Data", 
          PageTitle: "Master TN -Publish Review Non Clinical Data", 
          Breadcrumb: "Master TN"
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
export class TnRoutingModule {}
