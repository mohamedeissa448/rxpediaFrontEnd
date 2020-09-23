import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { LactationCategoryComponent } from "./lactation-category/lactation-category.component";
import { InteractionLabComponent } from "./interaction-lab-tests-list/interaction-lab-tests.component";
import { FrequencyIntervalComponent } from "./frequency-intervals/frequency-intervals.component";
import { DoseTypeComponent } from "./dose-type/dose-type.component";
import { MedicalConditionsComponent } from "./medical-conditions/medical-conditions.component";
import { SizeUnitsComponent } from "./size-units/size-units.component";
import { VolumeUnitsComponent } from "./volume-units/volume-units.component";
import { WeightUnitsComponent } from "./Weight-Units/weight-units.component";
import { Forms } from "./forms/forms.component";
import { PharmacologicalCategories } from "./pharmacological-categories/pharmacological-categories.component";
import { Routes, RouterModule } from "@angular/router";
import { SysSetupRouteComponent } from "./routes/manage-routes.component";

import { from } from "rxjs";
import { StrengthUnitsComponent } from "./strength-units/strength-units.component";
import { WeekDay } from "@angular/common";
import { DosingAgeComponent } from "./dosing-age/dosing-age.component";
import { DoseUnitComponent } from "./dose-units/dose-units.component";
import { DurationUnitComponent } from "./duration-units/duration-units.component";
import { InteractionFoodComponent } from "./interaction-food-list/interaction-food.component";
import { InteractionHerbsComponent } from "./interaction-herbs-list/interaction-herbs.component";
import { InteractionAlcoholComponent } from "./interaction-alcohol/interaction-alcohol.component";
import { PregnancyCategoryComponent } from "./pregnancy-category/pregnancy-category.component";

const routes: Routes = [
  {
    path: "sys-setup",
    children: [
      {
        path: "manage-routes",
        component: SysSetupRouteComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Routes", 
          PageTitle: "Manage Routes", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-pharmacological",
        component: PharmacologicalCategories,
        data: { 
          title: "RxP CMS Manager » System Setup » Pharmacological Categories", 
          PageTitle: "Manage Pharmacological Categories", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-forms",
        component: Forms,
        data: { 
          title: "RxP CMS Manager » System Setup » Forms", 
          PageTitle: "Manage Forms", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-strength-units",
        component: StrengthUnitsComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Strength Units", 
          PageTitle: "Manage Strength Units", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-weight-units",
        component: WeightUnitsComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Weight Units", 
          PageTitle: "Manage Weight Units", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-volume-units",
        component: VolumeUnitsComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Volume Units", 
          PageTitle: "Manage Volume Units", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-size-units",
        component: SizeUnitsComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Size Units", 
          PageTitle: "Manage Size Units", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-medical-conditions",
        component: MedicalConditionsComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Medical Conditions", 
          PageTitle: "Manage Medical Conditions", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-dosing-age",
        component: DosingAgeComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Dosing Age Categories",
          PageTitle: "Manage Dosing Age Categories", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-dose-types",
        component: DoseTypeComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Dose Types",
          PageTitle: "Manage Dose Types", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-dose-units",
        component: DoseUnitComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Dose Units",
          PageTitle: "Manage Dose Units", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-duration-units",
        component: DurationUnitComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Duration Units",
          PageTitle: "Manage Duration Units", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-frequency-intervals",
        component: FrequencyIntervalComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Frequency Intervals",
          PageTitle: "Manage Frequency Intervals", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-interaction-food",
        component: InteractionFoodComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Foods List",
          PageTitle: "Manage Foods List", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-interaction-herbs",
        component: InteractionHerbsComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Herbs List",
          PageTitle: "Manage Herbs List", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-interaction-lab-tests",
        component: InteractionLabComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Lab tests List",
          PageTitle: "Manage Lab tests List", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-interaction-alcohol",
        component: InteractionAlcoholComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Alcohols",
          PageTitle: "Manage Alcohols", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-pregnancy-category",
        component: PregnancyCategoryComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Pregnancy Categories",
          PageTitle: "Manage Pregnancy Categories", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "manage-lactation-category",
        component: LactationCategoryComponent,
        data: { 
          title: "RxP CMS Manager » System Setup » Lactation Categories",
          PageTitle: "Manage Lactation Categories", 
          Breadcrumb: 'System Setup'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
