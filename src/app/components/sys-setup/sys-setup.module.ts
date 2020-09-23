import { RoutesFormComponent } from "./routes/routes-form/routes-form.component";
import { LactationCategoryFormComponent } from "./lactation-category/lactation-category-form/lactation-category-form.component";
import { LactationCategoryComponent } from "./lactation-category/lactation-category.component";
import { InteractionAlcoholFormComponent } from "./interaction-alcohol/interaction-alcohol-form/interaction-alcohol-form.component";
import { InteractionLabFormComponent } from "./interaction-lab-tests-list/interaction-lab-tests-form/interaction-lab-tests-form.component";
import { InteractionLabComponent } from "./interaction-lab-tests-list/interaction-lab-tests.component";
import { FrequenctIntervalsFormComponent } from "./frequency-intervals/frequency-intervals-form/frequency-intervals-form.component";
import { FrequencyIntervalComponent } from "./frequency-intervals/frequency-intervals.component";
import { DoseTypeFormComponent } from "./dose-type/dose-type-form/dose-type-form.component";
import { DoseTypeComponent } from "./dose-type/dose-type.component";
import { DosingAgeFormComponent } from "./dosing-age/dosing-age-form/dosing-age-form.component";
import { DosingAgeComponent } from "./dosing-age/dosing-age.component";
import { MedicalConditionsFormComponent } from "./medical-conditions/medical-conditions-form/medical-conditions-form.component";
import { MedicalConditionsComponent } from "./medical-conditions/medical-conditions.component";
import { SizeUnitsFormComponent } from "./size-units/size-units-form/size-units-form.component";
import { SizeUnitsComponent } from "./size-units/size-units.component";
import { VolumeUnitsFormComponent } from "./volume-units/volume-units-form/volume-units-form.component";
import { WeightUnitsFormComponent } from "./Weight-Units/weight-units-form/weight-units-form.component";
import { WeightUnitsComponent } from "./Weight-Units/weight-units.component";
import { StrengthUnitsFormComponent } from "./strength-units/strength-units-form/strength-units-form.component";
import { FormsFormComponent } from "./forms/forms-form/forms-form.component";
import { Forms } from "./forms/forms.component";
import { PharmacologicalCategoriesFormComponent } from "./pharmacological-categories/pharmacological-categories-form/pharmacological-categories-form.component";
import { NgModule } from "@angular/core";
import { routing } from "./sys-setup.routing";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { SysSetupRouteComponent } from "./routes/manage-routes.component";
import { PharmacologicalCategories } from "./pharmacological-categories/pharmacological-categories.component";
import { StrengthUnitsComponent } from "./strength-units/strength-units.component";
import { VolumeUnitsComponent } from "./volume-units/volume-units.component";
import { DoseUnitComponent } from "./dose-units/dose-units.component";
import { DoseUnitFormComponent } from "./dose-units/dose-units-form/dose-units-form.component";
import { DurationUnitsFormComponent } from "./duration-units/duration-units-form/duration-units-form.component";
import { DurationUnitComponent } from "./duration-units/duration-units.component";
import { InteractionFoodComponent } from "./interaction-food-list/interaction-food.component";
import { InteractionFoodFormComponent } from "./interaction-food-list/interaction-food-form/interaction-food-form.component";
import { InteractionHerbsComponent } from "./interaction-herbs-list/interaction-herbs.component";
import { InteractionHerbsFormComponent } from "./interaction-herbs-list/interaction-herbs-form/interaction-herbs-form.component";
import { InteractionAlcoholComponent } from "./interaction-alcohol/interaction-alcohol.component";
import { PregnancyCategoryComponent } from "./pregnancy-category/pregnancy-category.component";
import { PregnancyCategoryFormComponent } from "./pregnancy-category/pregnancy-category-form/pregnancy-category-form.component";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  imports: [
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
    routing,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule
  ],
  declarations: [
    SysSetupRouteComponent,
    PharmacologicalCategoriesFormComponent,
    PharmacologicalCategories,
    SysSetupRouteComponent,
    RoutesFormComponent,
    Forms,
    FormsFormComponent,
    StrengthUnitsComponent,
    StrengthUnitsFormComponent,
    WeightUnitsComponent,
    WeightUnitsFormComponent,
    VolumeUnitsComponent,
    VolumeUnitsFormComponent,
    SizeUnitsComponent,
    SizeUnitsFormComponent,
    MedicalConditionsComponent,
    MedicalConditionsFormComponent,
    DosingAgeComponent,
    DosingAgeFormComponent,
    DoseTypeComponent,
    DoseTypeFormComponent,
    DoseUnitComponent,
    DoseUnitFormComponent,
    DurationUnitComponent,
    DurationUnitsFormComponent,
    FrequencyIntervalComponent,
    FrequenctIntervalsFormComponent,
    InteractionFoodComponent,
    InteractionFoodFormComponent,
    InteractionHerbsComponent,
    InteractionHerbsFormComponent,
    InteractionLabComponent,
    InteractionLabFormComponent,
    InteractionAlcoholComponent,
    InteractionAlcoholFormComponent,
    PregnancyCategoryComponent,
    PregnancyCategoryFormComponent,
    LactationCategoryComponent,
    LactationCategoryFormComponent
  ],
  entryComponents: [
    PharmacologicalCategoriesFormComponent,
    RoutesFormComponent,
    FormsFormComponent,
    StrengthUnitsFormComponent,
    WeightUnitsFormComponent,
    VolumeUnitsFormComponent,
    SizeUnitsFormComponent,
    MedicalConditionsFormComponent,
    DosingAgeFormComponent,
    DoseTypeFormComponent,
    DoseUnitFormComponent,
    DurationUnitsFormComponent,
    FrequenctIntervalsFormComponent,
    InteractionFoodFormComponent,
    InteractionHerbsFormComponent,
    InteractionLabFormComponent,
    InteractionAlcoholFormComponent,
    PregnancyCategoryFormComponent,
    LactationCategoryFormComponent
  ]
})
export class SysSetupModule {}
