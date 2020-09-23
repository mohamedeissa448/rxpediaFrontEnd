import { AuthService } from "../../../authentication/services/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../../../app-config";
import { Subject } from 'rxjs'

@Injectable({
  providedIn: "root"
})
export class TasksService {

  private UserTasksList = new Subject();
  private UserGroupedTasksList = new Subject();
  

  currentUserTasksList = this.UserTasksList.asObservable();
  currentUserGroupedTasksList = this.UserGroupedTasksList.asObservable();
  

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserAllTasksbyUserID() {
    this.http.post(`${systemSettings.serverURL}/getUserAllTasksbyUserID`,{
      user_id:this.authService.currentUser.User_Code //assume that token includes _id property
    }).subscribe((res:any) => {
      this.UserTasksList.next(res);
      var EditTasksList = {
        "Master AI": [],
        "Master TN": [],
        "Country Clinical Data": [],
        "Country Non Clinical Data": []
      };
      var reviewTasksList = {
        "Master AI": [],
        "Master TN": [],
        "Country Clinical Data": [],
        "Country Non Clinical Data": []
      };
      var grammerReviewTasksList = {
        "Master AI": [],
        "Master TN": [],
        "Country Clinical Data": [],
        "Country Non Clinical Data": []
      };
      var publishTasksList = {
        "Master AI": [],
        "Master TN": [],
        "Country Clinical Data": [],
        "Country Non Clinical Data": []
      };
      res.tasks.forEach(task => {
        switch (task.Task_ActionTypeName) {
            case "Edit": 
              EditTasksList[task.Task_RelatedTo].push(task);
              break;
            case "Review":
              reviewTasksList[task.Task_RelatedTo].push(task);
              break;
            case "Grammer Review":
              grammerReviewTasksList[task.Task_RelatedTo].push(task);
              break;
            case "Publish":
              publishTasksList[task.Task_RelatedTo].push(task);
              break;
        }
      })
      this.UserGroupedTasksList.next({
        '01Edit' : EditTasksList,
        '02Review' : reviewTasksList,
        '03Grammer Review' : grammerReviewTasksList,
        '04Publish' : publishTasksList
      })
      
    });
  }
  
}
