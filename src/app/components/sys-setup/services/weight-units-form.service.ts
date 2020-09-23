import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";
import { WeightUnitsComponent } from "../Weight-Units/weight-units.component";

@Injectable({
  providedIn: "root"
})
export class WeightUnitsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      WeightUnit_Code: new FormControl(""),
      WeightUnit_Name: new FormControl("", [Validators.required]),
      WeightUnit_Description: new FormControl(""),
      WeightUnit_CD: new FormControl(""),
      WeightUnit_CDDT: new FormControl(""),
      WeightUnit_CDPREV: new FormControl(""),
      WeightUnit_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({
      CategoryName: "",
      ATC_code: ""
    });
  }
  getWeightUnits() {
    return this.http.get(`${systemSettings.serverURL}/getWeightUnits`);
  }
  addWeightUnit(weightUnit) {
    console.log("added", weightUnit);
    return this.http
      .post(`${systemSettings}/addWeightUnits`, {
        name: weightUnit.WeightUnit_Name,
        desc: weightUnit.WeightUnit_Description
      })
      .subscribe(x => {});
  }
  updateWeightUnit(updatedWeightUnit) {
    if (updatedWeightUnit.WeightUnit_IsActive == false)
      updatedWeightUnit.WeightUnit_IsActive = 0;
    console.log("updated", updatedWeightUnit);
    this.http
      .post(`${systemSettings.serverURL}/editWeightUnits`, {
        name: updatedWeightUnit.WeightUnit_Name,
        code: updatedWeightUnit.WeightUnit_Code,
        desc: updatedWeightUnit.WeightUnit_Description,
        status: updatedWeightUnit.WeightUnit_IsActive,
        row_id: updatedWeightUnit.WeightUnit_Code
      })
      .subscribe(x => {});
  }
  popualteForm(weightUnit) {
    console.log("category", weightUnit);
    this.form.setValue({
      _id: weightUnit._id,
      WeightUnit_Code: weightUnit.WeightUnit_Code || "",
      WeightUnit_Name: weightUnit.WeightUnit_Name,
      WeightUnit_Description: weightUnit.WeightUnit_Description || "",
      WeightUnit_CD: weightUnit.WeightUnit_CD || "",
      WeightUnit_CDDT: weightUnit.WeightUnit_CDDT || "",
      WeightUnit_CDPREV: weightUnit.WeightUnit_CDPREV || "",
      WeightUnit_IsActive: weightUnit.WeightUnit_IsActive
    });
  }
}
