import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class PregnancyCategoryFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      Pregnancy_Code: new FormControl(""),
      Pregnancy_Name: new FormControl("", [Validators.required]),
      Pregnancy_Description: new FormControl(""),
      Pregnancy_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getPregnancyCategories() {
    return this.http.get(`${systemSettings.serverURL}/getPregnancy`);
  }
  addPregnancyCategorie(pregnancyCategory) {
    console.log("added", pregnancyCategory);
    return this.http.post(`${systemSettings.serverURL}/addPregnancy`, {
      Pregnancy_Name: pregnancyCategory.Pregnancy_Name,
      Pregnancy_Description: pregnancyCategory.Pregnancy_Description
    });
  }
  updatePregnancyCategorie(updatedPregnancyCategory) {
    if (updatedPregnancyCategory.Alcohol_IsActive == false)
      updatedPregnancyCategory.Alcohol_IsActive = 0;
    console.log("updated", updatedPregnancyCategory);
    return this.http.post(`${systemSettings.serverURL}/editUsageDuration`, {});
  }
  popualteForm(pregnancyCategory) {
    console.log("pregnancy", pregnancyCategory);
    this.form.setValue({
      _id: pregnancyCategory._id,
      Pregnancy_Description: pregnancyCategory.Pregnancy_Description || "",
      Pregnancy_Code: pregnancyCategory.Pregnancy_Code || "",
      Pregnancy_Name: pregnancyCategory.Pregnancy_Name,
      Pregnancy_IsActive: pregnancyCategory.Pregnancy_IsActive || ""
    });
  }
}
