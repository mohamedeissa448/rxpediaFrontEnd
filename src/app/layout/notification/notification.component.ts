import { TasksService } from "./../../layout/sidebar/services/tasks.service";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  moment = moment;
  NumOfAllTasks = 0;
  Top10Notifications = [];
  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.taskService.currentUserTasksList.subscribe((taskList: any) => {
      if (taskList.tasks.length > 0) {
        this.Top10Notifications = taskList.tasks.slice(0, 10)
        this.NumOfAllTasks = taskList.tasks.length;
      }
    })
  }
  
}
