import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class DurationUnitsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      UsageDoseDurationUnit_Code: new FormControl(""),
      UsageDoseDurationUnit_Name: new FormControl("", [Validators.required]),
      UsageDoseDurationUnit_Description: new FormControl(""),
      UsageDoseDurationUnit_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getDurationUnits() {
    return this.http.get(`${systemSettings.serverURL}/getAllUsageDuration`);
  }
  addDurationUnit(durationUnit) {
    console.log("added", durationUnit);
    return this.http
      .post(`${systemSettings.serverURL}/addUsageDuration`, {
        name: durationUnit.UsageDoseDurationUnit_Name,
        desc: durationUnit.UsageDoseDurationUnit_Description
      })
      .subscribe(x => {});
  }
  updateDurationUnit(updatedDurationUnit) {
    if (updatedDurationUnit.UsageAge_IsActive == false)
      updatedDurationUnit.UsageAge_IsActive = 0;
    console.log("updated", updatedDurationUnit);
    return this.http
      .post(`${systemSettings.serverURL}/editUsageDuration`, {
        name: updatedDurationUnit.UsageDoseDurationUnit_Name,
        code: updatedDurationUnit.UsageDoseDurationUnit_Code,
        desc: updatedDurationUnit.UsageDoseDurationUnit_Description,
        DurationUnitstatus: updatedDurationUnit.UsageDoseDurationUnit_IsActive,
        row_id: updatedDurationUnit.UsageDoseDurationUnit_Code,
        status: updatedDurationUnit.UsageDoseDurationUnit_IsActive
      })
      .subscribe(x => {});
  }
  popualteForm(durationUnit) {
    console.log("durationUnit", durationUnit);
    this.form.setValue({
      _id: durationUnit._id,
      UsageDoseDurationUnit_Code: durationUnit.UsageDoseDurationUnit_Code,
      UsageDoseDurationUnit_Name: durationUnit.UsageDoseDurationUnit_Name || "",
      UsageDoseDurationUnit_Description:
        durationUnit.UsageDoseDurationUnit_Description || "",
      UsageDoseDurationUnit_IsActive:
        durationUnit.UsageDoseDurationUnit_IsActive || ""
    });
  }
}
