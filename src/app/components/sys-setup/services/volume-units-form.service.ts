import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";

@Injectable({
  providedIn: "root"
})
export class VolumeUnitsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      VolumeUnit_Code: new FormControl(""),
      VolumeUnit_Name: new FormControl("", [Validators.required]),
      VolumeUnit_Description: new FormControl(""),
      VolumeUnit_CD: new FormControl(""),
      VolumeUnit_CDDT: new FormControl(""),
      VolumeUnit_CDPREV: new FormControl(""),
      VolumeUnit_IsActive: new FormControl("")
    });
  }
  initializeFormGroup() {
    this.form.setValue({
      CategoryName: "",
      ATC_code: ""
    });
  }
  getVolumeUnits() {
    return this.http.get(`${systemSettings.serverURL}/getVolumeUnits`);
  }
  addVolumeUnit(VolumeUnit) {
    console.log("added", VolumeUnit);
    return this.http
      .post(`${systemSettings.serverURL}/addVolumeUnits`, {
        name: VolumeUnit.VolumeUnit_Name,
        desc: VolumeUnit.VolumeUnit_Description
      })
      .subscribe(x => {});
  }
  updateVolumeUnit(updatedVolumeUnit) {
    if (updatedVolumeUnit.VolumeUnit_IsActive == false)
      updatedVolumeUnit.VolumeUnit_IsActive = 0;
    console.log("updated", updatedVolumeUnit);
    return this.http
      .post(`${systemSettings.serverURL}/editVolumeUnits`, {
        name: updatedVolumeUnit.VolumeUnit_Name,
        code: updatedVolumeUnit.VolumeUnit_Code,
        desc: updatedVolumeUnit.VolumeUnit_Description,
        status: updatedVolumeUnit.VolumeUnit_IsActive,
        row_id: updatedVolumeUnit.VolumeUnit_Code
      })
      .subscribe(x => {});
  }
  popualteForm(VolumeUnit) {
    console.log("VolumeUnit", VolumeUnit);
    this.form.setValue({
      _id: VolumeUnit._id,
      VolumeUnit_Code: VolumeUnit.VolumeUnit_Code || "",
      VolumeUnit_Name: VolumeUnit.VolumeUnit_Name,
      VolumeUnit_Description: VolumeUnit.VolumeUnit_Description || "",
      VolumeUnit_CD: VolumeUnit.VolumeUnit_CD || "",
      VolumeUnit_CDDT: VolumeUnit.VolumeUnit_CDDT || "",
      VolumeUnit_CDPREV: VolumeUnit.VolumeUnit_CDPREV || "",
      VolumeUnit_IsActive: VolumeUnit.VolumeUnit_IsActive || ""
    });
  }
}
