import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class SizeUnitsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      SizeUnit_Code: new FormControl(""),
      SizeUnit_Name: new FormControl("", [Validators.required]),
      SizeUnit_Description: new FormControl(""),
      SizeUnit_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {}
  getSizeUnits() {
    return this.http.get(`${systemSettings.serverURL}/getSizeUnits`);
  }
  addSizeUnit(sizeUnit) {
    console.log("added", sizeUnit);
    return this.http
      .post(`${systemSettings.serverURL}/addSizeUnits`, {
        name: sizeUnit.SizeUnit_Name,
        desc: sizeUnit.SizeUnit_Description
      })
      .subscribe(x => {});
  }
  updateSizeUnit(updatedSizeUnit) {
    if (updatedSizeUnit.VolumeUnit_IsActive == false)
      updatedSizeUnit.VolumeUnit_IsActive = 0;
    console.log("updated", updatedSizeUnit);
    return this.http
      .post(`${systemSettings.serverURL}/editSizeUnits`, {
        name: updatedSizeUnit.SizeUnit_Name,
        code: updatedSizeUnit.SizeUnit_Code,
        desc: updatedSizeUnit.SizeUnit_Description,
        status: updatedSizeUnit.SizeUnit_IsActive,
        row_id: updatedSizeUnit.SizeUnit_Code
      })
      .subscribe(x => {});
  }
  popualteForm(SizeUnit) {
    console.log("SizeUnit", SizeUnit);
    this.form.setValue({
      _id: new FormControl(),
      SizeUnit_Code: SizeUnit.SizeUnit_Code,
      SizeUnit_Name: SizeUnit.SizeUnit_Name,
      SizeUnit_Description: SizeUnit.SizeUnit_Description || "",
      SizeUnit_IsActive: SizeUnit.SizeUnit_IsActive
    });
  }
}
