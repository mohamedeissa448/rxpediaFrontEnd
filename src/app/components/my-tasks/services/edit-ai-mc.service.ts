import { AuthService } from "./../../../authentication/services/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class EditAIMCService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  searchAIByID(row_id) {
    return this.http.get(
      `${systemSettings.serverAIURL}/searchAIByID?row_id=${row_id}`
    );
  }
  getAIMasterFieldStructure() {
    return this.http.get(
      `${systemSettings.serverAIURL}/getAIMasterFieldStructure`
    );
  }
  getPregnancy() {
    return this.http.get(`${systemSettings.serverURL}/getPregnancy`);
  }
  getBreastFeeding() {
    return this.http.get(`${systemSettings.serverURL}/getBreastFeeding`);
  }
  getAIRevision(ai_id) {
    return this.http.post(`${systemSettings.serverURL}/getAIRevision`, {
      ai_id: ai_id
    });
  }
  editAIRevision(clinicalData) {
    return this.http
      .post(`${systemSettings.serverURL}/editAIRevision`, clinicalData)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  SubmitToReview(dataToSend) {
    return this.http
      .post(`${systemSettings.serverURL}/AddTaskAIToReviewer`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
}
