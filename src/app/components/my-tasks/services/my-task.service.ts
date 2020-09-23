import { AuthService } from "./../../../authentication/services/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";
@Injectable({
  providedIn: "root"
})
export class MyTaskService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  getUserAllTasksbyUserID() {
    return this.http.post(
      `${systemSettings.serverURL}/getUserAllTasksbyUserID`,
      {
        user_id:this.authService.currentUser.User_Code //assume that token includes _id property
      }
    );
  }
}
