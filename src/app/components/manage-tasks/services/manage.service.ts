import { systemSettings } from "./../../../app-config";
import { AuthService } from "./../../../authentication/services/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ManageService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  getUserAllTasksbyUserID() {
    return this.http.post(`${systemSettings.serverURL}/getUserAllTasks`, {});
  }
  getCountryCode(dataToSend) {
    return this.http.post(
      `${systemSettings.serverURL}/getCountryByRelatedCode`,
      dataToSend
    );
  }
  getEmployeesWithUniversalRole(RoleOfTheTask) {
    return this.http.post(
      `${systemSettings.serverURL}/getEmployeesWithUniversalRole`,
      RoleOfTheTask
    );
  }
  ChangeTask(dataToSend) {
    return this.http.post(`${systemSettings.serverURL}/ChangeTask`, dataToSend);
  }
}
