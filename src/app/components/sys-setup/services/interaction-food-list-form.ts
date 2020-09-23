import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class InteractionFoodFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      Food_Code: new FormControl(""),
      Food_Name: new FormControl("", [Validators.required]),
      Food_Description: new FormControl(""),
      Food_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({});
  }
  getFoodLists() {
    return this.http.get(`${systemSettings.serverURL}/getFoods`);
  }
  addFoodList(FrequencyInterval) {
    console.log("added", FrequencyInterval);
    return this.http
      .post(`${systemSettings.serverURL}/addFood`, {
        Food_Name: FrequencyInterval.Food_Name,
        Food_Description: FrequencyInterval.Food_Description
      })
      .subscribe(x => {});
  }
  updateFoodList(updatedFoodList) {
    if (updatedFoodList.UsageAge_IsActive == false)
      updatedFoodList.UsageAge_IsActive = 0;
    console.log("updated", updatedFoodList);
    return this.http
      .post(`${systemSettings.serverURL}/editFood`, {
        Food_Code: updatedFoodList.Food_Code,
        Food_Name: updatedFoodList.Food_Name,
        Food_IsActive: updatedFoodList.Food_IsActive,
        Food_Description: updatedFoodList.Food_Description
      })
      .subscribe(x => {});
  }
  popualteForm(foodList) {
    console.log("foodList", foodList);
    this.form.setValue({
      _id: foodList._id,
      Food_Code: foodList.Food_Code,
      Food_Name: foodList.Food_Name || "",
      Food_Description: foodList.Food_Description || "",
      Food_IsActive: foodList.Food_IsActive || ""
    });
  }
}
