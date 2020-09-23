import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";
@Injectable({
  providedIn: "root"
})
export class PharmacologicalCategoriesFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      Pharmaceutical_Category_Name: new FormControl("", [Validators.required]),
      Pharmaceutical_Category_ATC_Code: new FormControl("", [
        Validators.required
      ]),
      Pharmaceutical_Category_IsActive: new FormControl(""),
      Pharmaceutical_Category_Code: new FormControl("")
    });
  }

  getCategories() {
    return this.http.get(
      `${systemSettings.serverAIURL}/getPharmaceuticalCategory`
    );
  }
  addCategory(category) {
    console.log("added", category);
    return this.http.post(
      `${systemSettings.serverURL}/addPharmaceuticalCategory`,
      {
        name: category.Pharmaceutical_Category_Name,
        atc_code: category.Pharmaceutical_Category_ATC_Code,
        status: category.Pharmaceutical_Category_IsActive
      }
    );
  }
  updateCategory(updatedCategory) {
    if (updatedCategory.Pharmaceutical_Category_IsActive == false)
      updatedCategory.Pharmaceutical_Category_IsActive = 0;
    console.log("updated", updatedCategory);

    this.http.post(
      `${systemSettings.serverURL}/editPharmaceuticalCategory`,
      {
        row_id: updatedCategory.Pharmaceutical_Category_Code,
        name: updatedCategory.Pharmaceutical_Category_Name,
        atc_code: updatedCategory.Pharmaceutical_Category_ATC_Code,
        status: updatedCategory.Pharmaceutical_Category_IsActive
      } //n
    );
  }
  popualteForm(category) {
    console.log("category", category);
    this.form.setValue({
      _id: category._id,
      Pharmaceutical_Category_Name: category.Pharmaceutical_Category_Name,
      Pharmaceutical_Category_ATC_Code:
        category.Pharmaceutical_Category_ATC_Code,
      Pharmaceutical_Category_IsActive:
        category.Pharmaceutical_Category_IsActive,
      Pharmaceutical_Category_Code: category.Pharmaceutical_Category_Code
    });
  }
}
