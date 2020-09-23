import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class InteractionAlcoholFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      Alcohol_Code: new FormControl(""),
      Alcohol_Name: new FormControl("", [Validators.required]),
      Alcohol_Description: new FormControl(""),
      Alcohol_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getAlcohols() {
    return this.http.get(`${systemSettings.serverURL}/getAlcohol`);
  }
  addAlcohol(Alcohol) {
    console.log("added", Alcohol);
    return this.http.post(`${systemSettings.serverURL}/addAlcohol`, {
      Alcohol_Name: Alcohol.Alcohol_Name,
      Alcohol_Description: Alcohol.Alcohol_Description
    });
  }
  updateAlcohol(updatedAlcohol) {
    if (updatedAlcohol.Alcohol_IsActive == false)
      updatedAlcohol.Alcohol_IsActive = 0;
    console.log("updated", updatedAlcohol);
    return this.http
      .post(`${systemSettings.serverURL}/editAlcohol`, {
        Alcohol_Code: updatedAlcohol.Alcohol_Code,
        Alcohol_Name: updatedAlcohol.Alcohol_Name,
        Alcohol_IsActive: updatedAlcohol.Alcohol_IsActive,
        Alcohol_Description: updatedAlcohol.Alcohol_Description
      })
      .subscribe(x => {});
  }
  popualteForm(Alcohol) {
    console.log("Alcohol", Alcohol);
    this.form.setValue({
      _id: Alcohol._id,
      Alcohol_Description: Alcohol.Alcohol_Description || "",
      Alcohol_Code: Alcohol.Alcohol_Code || "",
      Alcohol_Name: Alcohol.Alcohol_Name,
      Alcohol_IsActive: Alcohol.Alcohol_IsActive || ""
    });
  }
}
