import { Component, OnInit } from "@angular/core";
import { MyTaskService } from "../services/my-task.service";
import * as moment from "moment";
@Component({
  selector: "app-user-tasks",
  templateUrl: "./user-tasks.component.html",
  styleUrls: ["./user-tasks.component.css"]
})
export class UserTasksComponent implements OnInit {
  navTab;
  allTasks = [];
  editTasks = {
    "Master AI": [],
    "Master TN": [],
    "Country Clinical Data": [],
    "Country Non Clinical Data": []
  };
  reviewTasks = {
    "Master AI": [],
    "Master TN": [],
    "Country Clinical Data": [],
    "Country Non Clinical Data": []
  };
  grammerReviewTasks = {
    "Master AI": [],
    "Master TN": [],
    "Country Clinical Data": [],
    "Country Non Clinical Data": []
  };
  publishTasks = {
    "Master AI": [],
    "Master TN": [],
    "Country Clinical Data": [],
    "Country Non Clinical Data": []
  };
  isTaskExist = false;
  constructor(private myTaskService: MyTaskService) {}
  ngOnInit() {
    this.myTaskService.getUserAllTasksbyUserID().subscribe((response: any) => {
      if (response.tasks.length > 0) {
        this.isTaskExist = true;
        this.allTasks = response.tasks;
        this.filterTasks();
      }
    });
  }
  changeNavTab(tab: string) {
    this.navTab = tab;
  }
  filterTasks() {
    console.log("all tasks", this.allTasks);
    this.allTasks.forEach(task => {
      switch (task.Task_ActionTypeName) {
        case "Edit":
          if (task.Task_RelatedTo == "Master AI") {
            task.Task_AssignDate = moment(task.Task_AssignDate)
              .startOf("hour")
              .fromNow();
            console.log("date", task.Task_AssignDate);
            this.editTasks["Master AI"].push(task);
          } else if (task.Task_RelatedTo == "Master TN")
            this.editTasks["Master TN"].push(task);
          else if (task.Task_RelatedTo == "Country Clinical Data")
            this.editTasks["Country Clinical Data"].push(task);
          else if (task.Task_RelatedTo == "Country Non Clinical Data")
            this.editTasks["Country Non Clinical Data"].push(task);
          break;
        case "Review":
          if (task.Task_RelatedTo == "Master AI")
            this.reviewTasks["Master AI"].push(task);
          else if (task.Task_RelatedTo == "Master TN")
            this.reviewTasks["Master TN"].push(task);
          else if (task.Task_RelatedTo == "Country Clinical Data")
            this.reviewTasks["Country Clinical Data"].push(task);
          else if (task.Task_RelatedTo == "Country Non Clinical Data")
            this.reviewTasks["Country Non Clinical Data"].push(task);
          break;
        case "Grammer Review":
          if (task.Task_RelatedTo == "Master AI")
            this.grammerReviewTasks["Master AI"].push(task);
          else if (task.Task_RelatedTo == "Master TN")
            this.grammerReviewTasks["Master TN"].push(task);
          else if (task.Task_RelatedTo == "Country Clinical Data")
            this.grammerReviewTasks["Country Clinical Data"].push(task);
          else if (task.Task_RelatedTo == "Country Non Clinical Data")
            this.grammerReviewTasks["Country Non Clinical Data"].push(task);
          break;
        case "Publish":
          if (task.Task_RelatedTo == "Master AI")
            this.publishTasks["Master AI"].push(task);
          else if (task.Task_RelatedTo == "Master TN")
            this.publishTasks["Master TN"].push(task);
          else if (task.Task_RelatedTo == "Country Clinical Data")
            this.publishTasks["Country Clinical Data"].push(task);
          else if (task.Task_RelatedTo == "Country Non Clinical Data")
            this.publishTasks["Country Non Clinical Data"].push(task);
          break;
      }
    });
    console.log("edit", this.editTasks);
  }
}
