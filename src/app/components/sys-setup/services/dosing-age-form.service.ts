import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class DosingAgeFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      UsageAge_Code: new FormControl(""),
      UsageAge_Name: new FormControl("", [Validators.required]),
      UsageAge_Description: new FormControl(""),
      UsageAge_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getDosingAges() {
    return this.http.get(`${systemSettings.serverURL}/getAllUsageAge`);
  }
  addDosingAge(dosing) {
    console.log("added", dosing);
    return this.http
      .post(`${systemSettings.serverURL}/addUsageAge`, {
        name: dosing.UsageAge_Name,
        desc: dosing.UsageAge_Description
      })
      .subscribe(x => {});
  }

  updateDosingAge(updatedDosingAge) {
    if (updatedDosingAge.UsageAge_IsActive == false)
      updatedDosingAge.UsageAge_IsActive = 0;
    console.log("updated", updatedDosingAge);
    return this.http
      .post(`${systemSettings.serverURL}/editUsageAge`, {
        name: updatedDosingAge.UsageAge_Name,
        code: updatedDosingAge.UsageAge_Code,
        desc: updatedDosingAge.UsageAge_Description,
        dosingtostatus: updatedDosingAge.UsageAge_IsActive == 1 ? true : false,
        row_id: updatedDosingAge.UsageAge_Code,
        status: updatedDosingAge.UsageAge_IsActive
      })
      .subscribe(x => {});
  }
  popualteForm(dosing) {
    dosing.UsageAge_IsActive == true ? 1 : 0;
    console.log("dosing", dosing);
    this.form.setValue({
      _id: dosing._id,
      UsageAge_Code: dosing.UsageAge_Code,
      UsageAge_Name: dosing.UsageAge_Name || "",
      UsageAge_Description: dosing.UsageAge_Description || "",
      UsageAge_IsActive: dosing.UsageAge_IsActive || ""
    });
  }
}
