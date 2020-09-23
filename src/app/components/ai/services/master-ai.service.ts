import { element } from "protractor";
import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";
@Injectable({
  providedIn: "root"
})
export class MasterAIService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(""),
      AI_ATC_Code: new FormArray([new FormControl("")], Validators.required),
      AI_Pharmaceutical_Categories_ID: new FormArray([]), //
      AI_Alternative_Name: new FormArray([new FormControl("")]), //
      AI_Name: new FormControl(""),
      AI_Code: new FormControl(""),
      AI_Status: new FormControl(""),
      pharamaceutical: new FormArray([]) //
    });
  }

  getAIs() {
    return this.http.get(`${systemSettings.serverAIURL}/getAINoletterfilter`);
  }
  addAI(AI) {
    console.log("added", {
      name: AI.AI_Name,
      atc_code: AI.AI_ATC_Code.filter(element => element != ""),
      category_Ids: AI.pharamaceutical.map(
        element => element.Pharmaceutical_Category_Code
      ),
      AI_Alternative_Name: AI.AI_Alternative_Name.filter(
        element => element != null
      )
    });
    return this.http
      .post(`${systemSettings.serverAIURL}/addPharmaceuticalCategory`, {
        name: AI.AI_Name,
        atc_code: AI.AI_ATC_Code.filter(element => element != ""),
        category_Ids: AI.pharamaceutical.map(
          element => element.Pharmaceutical_Category_Code
        ),
        lternative_Name: AI.AI_Alternative_Name.filter(
          element => element != null
        )
      })
      .subscribe(x => {});
  }
  updateAI(updatedAI) {
    if (updatedAI.Pharmaceutical_Category_IsActive == false)
      updatedAI.Pharmaceutical_Category_IsActive = 0;
    console.log("updated", {
      name: updatedAI.AI_Name,
      row_id: updatedAI.AI_Code,
      code: updatedAI.AI_Code,
      status: updatedAI.AI_Status,
      category_Ids: updatedAI.AI_Pharmaceutical_Categories_ID,
      atc_code: updatedAI.AI_ATC_Code,
      AI_Alternative_Name: updatedAI.AI_Alternative_Name
    });

    this.http
      .post(`${systemSettings.serverAIURL}/editAI`, {
        name: updatedAI.AI_Name,
        row_id: updatedAI.AI_Code,
        code: updatedAI.AI_Code,
        status: updatedAI.AI_Status,
        category_Ids: updatedAI.AI_Pharmaceutical_Categories_ID,
        atc_code: updatedAI.AI_ATC_Code,
        AI_Alternative_Name: updatedAI.AI_Alternative_Name
      })
      .subscribe(x => {});
  }
  popualteForm(AI) {
    console.log("AI", AI);
    console.log("hamada", this.form.get("pharamaceutical"));
    setTimeout(() => {
      this.form.patchValue({
        _id: AI._id,
        AI_Name: AI.AI_Name,
        AI_Code: AI.AI_Code,
        AI_Status: AI.AI_Status
      });
    });

    //to clear form Arrays
    (this.form.get("pharamaceutical") as FormArray).clear();
    (this.form.get("AI_Pharmaceutical_Categories_ID") as FormArray).clear();
    (this.form.get("AI_ATC_Code") as FormArray).clear();
    (this.form.get("AI_Alternative_Name") as FormArray).clear();
    AI.pharamaceutical.forEach(element => {
      (this.form.get("pharamaceutical") as FormArray).push(
        new FormControl(element)
      );
    });

    AI.AI_Alternative_Name.forEach(element => {
      (this.form.get("AI_Alternative_Name") as FormArray).push(
        new FormControl(element)
      );
    });

    AI.pharamaceutical.forEach(element => {
      (this.form.get("AI_Pharmaceutical_Categories_ID") as FormArray).push(
        new FormControl(element.Pharmaceutical_Category_Code)
      );
    });
    AI.AI_ATC_Code.forEach(element => {
      (this.form.get("AI_ATC_Code") as FormArray).push(
        new FormControl(element)
      );
    });
    this.form.setControl("pharamaceutical", this.form.get("pharamaceutical"));
    this.form.setControl(
      "AI_Alternative_Name",
      this.form.get("AI_Alternative_Name")
    );
    this.form.setControl(
      "AI_Pharmaceutical_Categories_ID",
      this.form.get("AI_Pharmaceutical_Categories_ID")
    );
    this.form.setControl("AI_ATC_Code", this.form.get("AI_ATC_Code"));
  }
  addSelectedCategory(category) {
    let isCategoryExist = false;
    (this.form.get("pharamaceutical") as FormArray).controls.forEach(
      control => {
        if (
          control.value.Pharmaceutical_Category_Code ==
          category.Pharmaceutical_Category_Code
        ) {
          isCategoryExist = true;
        }
      }
    );
    if (!isCategoryExist) {
      (this.form.get("pharamaceutical") as FormArray).push(
        new FormControl(category)
      );
      (this.form.get("AI_Pharmaceutical_Categories_ID") as FormArray).push(
        new FormControl(category.Pharmaceutical_Category_Code)
      );
      (this.form.get("AI_ATC_Code") as FormArray).push(new FormControl(""));
    }
  }
  addAlternativeName(newName) {
    (this.form.get("AI_Alternative_Name") as FormArray).push(
      new FormControl(newName)
    );
  }

  deleteAlternativeName(indexToDelete) {
    (this.form.get("AI_Alternative_Name") as FormArray).removeAt(indexToDelete);
  }
  deleteSelectedCategory(
    Pharmaceutical_Category_Code,
    Pharmaceutical_Category_ATC_Code
  ) {
    let index = -1;
    (this.form.get("pharamaceutical") as FormArray).controls.forEach(
      control => {
        if (
          control.value.Pharmaceutical_Category_Code ==
          Pharmaceutical_Category_Code
        ) {
          index = (this.form.get(
            "pharamaceutical"
          ) as FormArray).controls.indexOf(control);
          (this.form.get("pharamaceutical") as FormArray).removeAt(index);
        }
      }
    );

    (this.form.get(
      "AI_Pharmaceutical_Categories_ID"
    ) as FormArray).controls.forEach(control => {
      if (control.value == Pharmaceutical_Category_Code) {
        index = (this.form.get(
          "AI_Pharmaceutical_Categories_ID"
        ) as FormArray).controls.indexOf(control);
        (this.form.get(
          "AI_Pharmaceutical_Categories_ID"
        ) as FormArray).removeAt(index);
      }
    });

    (this.form.get("AI_ATC_Code") as FormArray).removeAt(index);
  }
  getTaskByAICode(AICode) {
    return this.http.post(`${systemSettings.serverPublicURL}/getTaskByAICode`, {
      ai_id: AICode
    });
  }
  getAIMasterFieldStructure() {
    return this.http.get(
      `${systemSettings.serverAIURL}/getAIMasterFieldStructure`
    );
  }
  getPharmacologicalCategories() {
    return this.http.get(
      `${systemSettings.serverAIURL}/getPharmaceuticalCategory`
    );
  }
  getAIFullClinicalDataByID(AICode){
    return this.http.post(`${systemSettings.serverAIURL}/searchAIFullDataByID`, {
      row_id: AICode
    });
    
  }
}