import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class FrequencyIntervalsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      UsageFrequenIntervalUnit_Code: new FormControl(""),
      UsageFrequenIntervalUnit_Name: new FormControl("", [Validators.required]),
      UsageFrequenIntervalUnit_Description: new FormControl(""),
      UsageFrequenIntervalUnit_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getFrequencyIntervals() {
    return this.http.get(
      `${systemSettings.serverURL}/getAllUsageFrequenInterval`
    );
  }
  addFrequencyInterval(FrequencyInterval) {
    console.log("added", FrequencyInterval);
    return this.http
      .post(`${systemSettings.serverURL}/addUsageFrequenInterval`, {
        name: FrequencyInterval.UsageFrequenIntervalUnit_Name,
        desc: FrequencyInterval.UsageFrequenIntervalUnit_Description
      })
      .subscribe(x => {});
  }
  updateFrequencyInterval(updatedFrequencyInterval) {
    if (updatedFrequencyInterval.UsageAge_IsActive == false)
      updatedFrequencyInterval.UsageAge_IsActive = 0;
    console.log("updated", updatedFrequencyInterval);
    return this.http
      .post(`${systemSettings.serverURL}/editUsageFrequenInterval`, {
        name: updatedFrequencyInterval.UsageFrequenIntervalUnit_Name,
        code: updatedFrequencyInterval.UsageFrequenIntervalUnit_Code,
        desc: updatedFrequencyInterval.UsageFrequenIntervalUnit_Description,
        concestatus: updatedFrequencyInterval.UsageFrequenIntervalUnit_IsActive,
        row_id: updatedFrequencyInterval.UsageFrequenIntervalUnit_Code,
        status: updatedFrequencyInterval.UsageFrequenIntervalUnit_IsActive
      })
      .subscribe(x => {});
  }
  popualteForm(FrequencyInterval) {
    console.log("FrequencyInterval", FrequencyInterval);
    this.form.setValue({
      _id: FrequencyInterval._id,
      UsageFrequenIntervalUnit_Code:
        FrequencyInterval.UsageFrequenIntervalUnit_Code,
      UsageFrequenIntervalUnit_Name:
        FrequencyInterval.UsageFrequenIntervalUnit_Name || "",
      UsageFrequenIntervalUnit_Description:
        FrequencyInterval.UsageFrequenIntervalUnit_Description || "",
      UsageFrequenIntervalUnit_IsActive:
        FrequencyInterval.UsageFrequenIntervalUnit_IsActive || ""
    });
  }
}
