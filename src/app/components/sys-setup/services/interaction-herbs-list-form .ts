import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class InteractionHerbsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      Herbs_Code: new FormControl(""),
      Herbs_Name: new FormControl("", [Validators.required]),
      Herbs_Description: new FormControl(""),
      Herbs_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getHerbsLists() {
    return this.http.get(`${systemSettings.serverURL}/getHerbs`);
  }
  addFoodList(herbsList) {
    console.log("added", herbsList);
    return this.http
      .post(`${systemSettings.serverURL}/addHerbs`, {
        Herbs_Name: herbsList.Herbs_Name,
        Herbs_Description: herbsList.Herbs_Description
      })
      .subscribe(x => {});
  }
  updateHerbsList(updatedHerbsList) {
    if (updatedHerbsList.UsageAge_IsActive == false)
      updatedHerbsList.UsageAge_IsActive = 0;
    console.log("updated", updatedHerbsList);
    return this.http
      .post(`${systemSettings.serverURL}/editHerbs`, {
        Herbs_Code: updatedHerbsList.Herbs_Code,
        Herbs_Name: updatedHerbsList.Herbs_Name,
        Herbs_IsActive: updatedHerbsList.Herbs_IsActive,
        Herbs_Description: updatedHerbsList.Herbs_Description
      })
      .subscribe(x => {});
  }
  popualteForm(herbsList) {
    console.log("herbsList", herbsList);
    this.form.setValue({
      _id: herbsList._id,
      Herbs_Description: herbsList.Herbs_Description || "",
      Herbs_Code: herbsList.Herbs_Code || "",
      Herbs_Name: herbsList.Herbs_Name || "",
      Herbs_IsActive: herbsList.Herbs_IsActive || ""
    });
  }
}
