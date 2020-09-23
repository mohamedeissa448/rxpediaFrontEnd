import { systemSettings } from "./../../../app-config";
import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class FormsFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      Form_Code: new FormControl(""),
      Form_Name: new FormControl("", [Validators.required]),
      Form_Description: new FormControl(""),
      Form_Cd: new FormControl(""),
      Form_Cddt: new FormControl(""),
      Form_CdPrev: new FormControl(""),
      Form_IsActive: new FormControl("")
    });
  }

  getForms() {
    return this.http.get(`${systemSettings.serverURL}/getForm`);
  }
  addForm(form) {
    console.log("added", form);
    return this.http
      .post(`${systemSettings.serverURL}/addForm`, {
        name: form.Form_Name,
        desc: form.Form_Description,
        cd: form.Form_Cd,
        cddt: form.Form_Cddt,
        cdprev: form.Form_CdPrev
      }) //need modification
      .subscribe(x => {
        console.log(x);
      });
  }
  updateForm(updatedForm) {
    if (updatedForm.Form_IsActive == false) updatedForm.Form_IsActive = 0;
    console.log("updated", updatedForm);
    return this.http
      .post(`${systemSettings.serverURL}/editForm`, {
        name: updatedForm.Form_Name,
        code: updatedForm.Form_Code,
        row_id: updatedForm.Form_Code,
        desc: updatedForm.Form_Description,
        cd: updatedForm.Form_Cd,
        cddt: updatedForm.Form_Cddt,
        cdprev: updatedForm.Form_CdPrev,
        status: updatedForm.Form_IsActive
      })
      .subscribe(x => {
        console.log(x);
      });
  }
  popualteForm(form) {
    this.form.setValue({
      _id: form._id,
      Form_Code: form.Form_Code || "",
      Form_Name: form.Form_Name,
      Form_Description: form.Form_Description || "",
      Form_Cd: form.Form_Cd || "",
      Form_Cddt: form.Form_Cddt || "",
      Form_CdPrev: form.Form_CdPrev || "",
      Form_IsActive: form.Form_IsActive || ""
    });
  }
}
