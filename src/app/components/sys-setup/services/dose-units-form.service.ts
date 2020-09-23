import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class DoseUnitsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      UsageDoseUnit_Code: new FormControl(""),
      UsageDoseUnit_Name: new FormControl("", [Validators.required]),
      UsageDoseUnit_Description: new FormControl(""),
      UsageDoseUnit_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getDoseUnits() {
    return this.http.get(`${systemSettings.serverURL}/getAllUsageDoseUnit`);
  }
  addDoseUnit(doseUnit) {
    console.log("added", doseUnit);
    return this.http
      .post(`${systemSettings.serverURL}/addUsageDoseUnit`, {
        name: doseUnit.UsageDoseUnit_Name,
        desc: doseUnit.UsageDoseUnit_Description
      })
      .subscribe(x => {});
  }
  updateDoseUnit(updatedDoseUnit) {
    if (updatedDoseUnit.UsageAge_IsActive == false)
      updatedDoseUnit.UsageAge_IsActive = 0;
    console.log("updated", updatedDoseUnit);
    return this.http
      .post(`${systemSettings.serverURL}/editUsageDoseUnit`, {
        name: updatedDoseUnit.UsageDoseUnit_Name,
        code: updatedDoseUnit.UsageDoseUnit_Code,
        desc: updatedDoseUnit.UsageDoseUnit_Description,
        status: updatedDoseUnit.UsageDoseUnit_IsActive,
        row_id: updatedDoseUnit.UsageDoseUnit_Code,
        doseUnitstatus:
          updatedDoseUnit.UsageDoseUnit_IsActive == 1 ? true : false
      })
      .subscribe(x => {});
  }
  popualteForm(doseUnit) {
    console.log("doseUnit", doseUnit);
    this.form.setValue({
      _id: doseUnit._id,
      UsageDoseUnit_Code: doseUnit.UsageDoseUnit_Code,
      UsageDoseUnit_Name: doseUnit.UsageDoseUnit_Name || "",
      UsageDoseUnit_Description: doseUnit.UsageDoseUnit_Description || "",
      UsageDoseUnit_IsActive: doseUnit.UsageDoseUnit_IsActive || ""
    });
  }
}
