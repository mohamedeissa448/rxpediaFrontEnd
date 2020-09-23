import { AuthService } from "../../../authentication/services/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { data } from 'jquery';

@Injectable({
  providedIn: "root"
})
export class MasterAIEditClinicalDataService {
  private InterActionFullData = new Subject();

  currentInterActionFullData = this.InterActionFullData.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  checkTask(TaskID, UserID){
    return this.http.post(`${systemSettings.serverPublicURL}/CheckUserTask`, {
      UserID: UserID,
      Task_Code: TaskID
    });
  }

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
    return this.http.get(`${systemSettings.serverShareURL}/getPregnancy`);
  }
  getBreastFeeding() {
    return this.http.get(`${systemSettings.serverShareURL}/getBreastFeeding`);
  }
  getAIRevision(ai_id) {
    return this.http.post(`${systemSettings.serverAIURL}/getAIRevision`, {
      ai_id: ai_id
    });
  }
  getAIDosing(Revision_Code) {
    return this.http.post(`${systemSettings.serverAIURL}/getAIDosing`, {
      AIMasterRevision_Code: Revision_Code
    });
  }
  getUsageAges() {
    return this.http.get(`${systemSettings.serverShareURL}/getUsageAge`);
  }
  getPopulation() {
    return this.http.get(`${systemSettings.serverShareURL}/getPopulation`);
  }
  getMedicalCondition() {
    return this.http.get(
      `${systemSettings.serverShareURL}/getMedicalCondition`
    );
  }
  getActiveRoute() {
    return this.http.get(`${systemSettings.serverShareURL}/getActiveRoute`);
  }
  getInteractionData() {
    console.log("1");
    var objInteractionFullData = {};
    this.http
      .get(`${systemSettings.serverShareURL}/getInteractionType`, {})
      .subscribe(InteractionTypes => {
        objInteractionFullData["InteractionTypes"] = InteractionTypes;
        this.InterActionFullData.next(objInteractionFullData);
        this.getInteractionLevel().subscribe(InteractionLevel => {
          objInteractionFullData["InteractionLevel"] = InteractionLevel;
          this.InterActionFullData.next(objInteractionFullData);
          this.getInteractionReliability().subscribe(InteractionReliability => {
            objInteractionFullData[
              "InteractionReliability"
            ] = InteractionReliability;
            this.InterActionFullData.next(objInteractionFullData);
            this.getInteractionSeverity().subscribe(InteractionSeverity => {
              console.log("2");
              objInteractionFullData[
                "InteractionSeverity"
              ] = InteractionSeverity;
              this.InterActionFullData.next(objInteractionFullData);
              this.getActiveFoods().subscribe(ActiveFoods => {
                objInteractionFullData["ActiveFoods"] = ActiveFoods;
                this.InterActionFullData.next(objInteractionFullData);
                this.getAIIDandName().subscribe(AIIDandName => {
                  objInteractionFullData["AIIDandName"] = AIIDandName;
                  this.InterActionFullData.next(objInteractionFullData);
                  this.getActiveLabTest().subscribe(ActiveLabTest => {
                    objInteractionFullData["ActiveLabTest"] = ActiveLabTest;
                    this.InterActionFullData.next(objInteractionFullData);
                    this.getActiveHerbs().subscribe(ActiveHerbs => {
                      objInteractionFullData["ActiveHerbs"] = ActiveHerbs;
                      this.InterActionFullData.next(objInteractionFullData);
                      this.getActiveAlcohol().subscribe(ActiveAlcohol => {
                        objInteractionFullData["ActiveAlcohol"] = ActiveAlcohol;
                        this.InterActionFullData.next(objInteractionFullData);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
  }
  getInteractionLevel() {
    return this.http.get(
      `${systemSettings.serverShareURL}/getInteractionLevel`,
      {}
    );
  }
  getInteractionReliability() {
    return this.http.get(
      `${systemSettings.serverShareURL}/getInteractionReliability`,
      {}
    );
  }
  getInteractionSeverity() {
    return this.http.get(
      `${systemSettings.serverShareURL}/getInteractionSeverity`,
      {}
    );
  }
  getActiveFoods() {
    return this.http.get(`${systemSettings.serverShareURL}/getActiveFoods`, {});
  }
  getAIIDandName() {
    return this.http.get(`${systemSettings.serverAIURL}/getAIIDandName`, {});
  }
  getActiveLabTest() {
    return this.http.get(`${systemSettings.serverURL}/getActiveLabTest`, {});
  }
  getActiveHerbs() {
    return this.http.get(`${systemSettings.serverShareURL}/getActiveHerbs`, {});
  }
  getActiveAlcohol() {
    return this.http.get(
      `${systemSettings.serverShareURL}/getActiveAlcohol`,
      {}
    );
  }

  editAIRevision(clinicalData) {
    clinicalData.AIMasterRevision_Dosing = [];
    clinicalData.AIMasterRevision_Interaction_AI = [];
    clinicalData.AIMasterRevision_Interaction_Food = [];
    clinicalData.AIMasterRevision_Interaction_Alcohol= [];
    clinicalData.AIMasterRevision_Interaction_Herbs= [];
    clinicalData.AIMasterRevision_Interaction_LabTest= [];

    console.log("clinicalData inside service");
    console.log(clinicalData);
    return this.http
      .post(`${systemSettings.serverAIURL}/editAIRevision`, clinicalData)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  SubmitToReview(dataToSend) {
    return this.http
      .post(`${systemSettings.serverAIURL}/AddTaskAIToReviewer`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  AddMasterAIRevisionInteraction(dataToSend) {
    return this.http
      .post(
        `${systemSettings.serverAIURL}/AddMasterAIRevisionInteraction`,
        dataToSend
      )
      .pipe(
        map((response: any) => {
          console.log("add interaction response")
          console.log(response)
          if (response.message == true) return true;
          return false;
        })
      );
  }
  EditMasterAIRevisionInteraction(dataToSend){
    return this.http
    .post(
      `${systemSettings.serverAIURL}/EditMasterAIRevisionInteraction`,
      dataToSend
    )
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  EditMasterAIRevisionDosing(dataToSend){
    return this.http
    .post(
      `${systemSettings.serverAIURL}/EditMasterAIRevisionDosing`,
      dataToSend
    )
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  getAIInteraction(dataToSend) {
    return this.http.post(
      `${systemSettings.serverAIURL}/getAIInteraction`,
      dataToSend
    );
  }
  DeleteMasterAIRevisionInteraction(dataTOsend) {
    return this.http.post(`${systemSettings.serverAIURL}/DeleteMasterAIRevisionInteraction`, dataTOsend)
  }
  DeleteMasterAIRevisionDosing(dataTOsend) {
    return this.http.post(`${systemSettings.serverAIURL}/DeleteMasterAIRevisionDosing`, dataTOsend)
  }

  // send clinical data to Gramer Reviewer
  AddTaskAIToGrammer(dataToSend){
    return this.http
    .post(`${systemSettings.serverAIURL}/AddTaskAIToGrammer`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }

  // send clinical data to publisher
  AddTaskAIToPublisher(dataToSend){
    return this.http
    .post(`${systemSettings.serverAIURL}/AddTaskAIToPublisher`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  //publish ai clinical data
  PublishAiClinicalData(dataToSend){
    return this.http
    .post(`${systemSettings.serverAIURL}/AddAIData`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }

  //Return Data To Editor
  ReturnTaskAIToEditor(dataToSend){
    return this.http
    .post(`${systemSettings.serverAIURL}/ReturnTaskAIToEditor`, dataToSend)
    .pipe(
      map((response: any) => {
        console.log("response ReturnTaskAIToEditor")
        console.log(response)
        if (response.message == true) return true;
        return false;
      })
    );
  }
}
