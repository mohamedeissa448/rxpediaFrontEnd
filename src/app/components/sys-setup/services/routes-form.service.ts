import { systemSettings } from "./../../../app-config";
import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { SysSetupRouteComponent } from "../routes/manage-routes.component";
@Injectable({
  providedIn: "root"
})
export class RoutesFormService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      _id: new FormControl(),
      Route_Code: new FormControl(""),
      Route_Name: new FormControl("", [Validators.required]),
      Route_Description: new FormControl(""),
      Route_Cd: new FormControl(""),
      Route_Cddt: new FormControl(""),
      Route_CdPrev: new FormControl(""),
      Route_IsActive: new FormControl("")
    });
  }

  getRoutes() {
    return this.http.get(`${systemSettings.serverURL}/getRoute`);
  }
  addRoute(route) {
    console.log("added", route);
    return this.http
      .post(`${systemSettings.serverURL}/addRoute`, {
        name: route.Route_Name,
        desc: route.Route_Description,
        cd: route.Route_Cd,
        cddt: route.Route_Cddt,
        cdprev: route.Route_CdPrev
      })
      .subscribe(z => {});
  }
  updateRoute(updateRoute) {
    if (updateRoute.Route_IsActive == false) updateRoute.Route_IsActive = 0;
    console.log("updated", updateRoute);

    this.http
      .post(`${systemSettings.serverURL}/editRoute`, {
        row_id: updateRoute.Route_Code,
        name: updateRoute.Route_Name,
        code: updateRoute.Route_Code,
        desc: updateRoute.Route_Description,
        cd: updateRoute.Route_Cd,
        cddt: updateRoute.Route_Cddt,
        cdprev: updateRoute.Route_CdPrev,
        status: updateRoute.Route_IsActive
      })
      .subscribe(x => {});
  }
  popualteForm(route) {
    console.log("route", route);
    this.form.setValue({
      _id: route._id,
      Route_Code: route.Route_Code || "",
      Route_Name: route.Route_Name,
      Route_Description: route.Route_Description || "",
      Route_Cd: route.Route_Cd || "",
      Route_Cddt: route.Route_Cddt || "",
      Route_CdPrev: route.Route_CdPrev || "",
      Route_IsActive: route.Route_IsActive || ""
    });
  }
}
