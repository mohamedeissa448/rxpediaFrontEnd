import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class LactationCategoryFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      BreastFeeding_Code: new FormControl(""),
      BreastFeeding_Name: new FormControl("", [Validators.required]),
      BreastFeeding_Description: new FormControl(""),
      BreastFeeding_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getLactationCategories() {
    return this.http.get(`${systemSettings.serverURL}/getBreastFeeding`);
  }
  addLactationCategory(lactationCategory) {
    console.log("added", lactationCategory);
    return this.http.post(`${systemSettings.serverURL}/addBreastFeeding`, {
      BreastFeeding_Name: lactationCategory.BreastFeeding_Name,
      BreastFeeding_Description: lactationCategory.BreastFeeding_Description
    });
  }
  updateLactationCategory(updatedLactationCategory) {
    if (updatedLactationCategory.BreastFeeding_IsActive == false)
      updatedLactationCategory.BreastFeeding_IsActive = 0;
    console.log("updated", updatedLactationCategory);
    return this.http.post(
      `${systemSettings.serverURL}/editUsageDuration`, //very strange
      updatedLactationCategory //need modification
    );
  }
  popualteForm(lactationCategory) {
    console.log("lactationCategory", lactationCategory);
    this.form.setValue({
      _id: lactationCategory._id,
      BreastFeeding_Description:
        lactationCategory.BreastFeeding_Description || "",
      BreastFeeding_Code: lactationCategory.BreastFeeding_Code || "",
      BreastFeeding_Name: lactationCategory.BreastFeeding_Name,
      BreastFeeding_IsActive: lactationCategory.BreastFeeding_IsActive || ""
    });
  }
}
