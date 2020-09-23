import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class StrengthUnitsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      StrengthUnit_Code: new FormControl(""),
      StrengthUnit_Name: new FormControl("", [Validators.required]),
      StrengthUnit_Description: new FormControl(""),
      StrengthUnit_IsActive: new FormControl("")
    });
  }

  getStrengthUnits() {
    return this.http.get(`${systemSettings.serverURL}/getStrengthUnits`);
  }
  addStrengthUnit(strengthUnit) {
    console.log("added", strengthUnit);
    return this.http.post(`${systemSettings.serverURL}/addStrengthUnits`, {
      name: strengthUnit.StrengthUnit_Name,
      desc: strengthUnit.StrengthUnit_Description
    });
  }
  updateStrengthUnit(updatedStrengthUnit) {
    if (updatedStrengthUnit.StrengthUnit_IsActive == false)
      updatedStrengthUnit.StrengthUnit_IsActive = 0;
    console.log("updated", updatedStrengthUnit);
    return this.http.post(`${systemSettings.serverURL}/editStrengthUnits`, {
      name: updatedStrengthUnit.StrengthUnit_Name,
      code: updatedStrengthUnit.StrengthUnit_Code,
      desc: updatedStrengthUnit.StrengthUnit_Description,
      status: updatedStrengthUnit.StrengthUnit_IsActive,
      row_id: updatedStrengthUnit.StrengthUnit_Code
    });
  }
  popualteForm(strengthUnit) {
    console.log("strengthUnit", strengthUnit);
    this.form.setValue({
      _id: strengthUnit._id,
      StrengthUnit_Code: strengthUnit.StrengthUnit_Code || "",
      StrengthUnit_Name: strengthUnit.StrengthUnit_Name,
      StrengthUnit_Description: strengthUnit.StrengthUnit_Description || "",
      StrengthUnit_IsActive: strengthUnit.StrengthUnit_IsActive || ""
    });
  }
}
