import { ManageService } from "./../services/manage.service";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { ChangeOwnerFormComponent } from "./change-owner-form/change-owner-form.component";
import { PageTitleService } from '../../../services/page-title.service';

@Component({
  selector: "app-managing-tasks",
  templateUrl: "./managing-tasks.component.html",
  styleUrls: ["./managing-tasks.component.css"]
})
export class ManagingTasksComponent implements OnInit {
  navTab: string = "edit";
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
  constructor(
    private manageService: ManageService,private PageTitle: PageTitleService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.PageTitle.ChangePageTitle('Manage Tasks',"Employees' Tasks");
    this.manageService.getUserAllTasksbyUserID().subscribe((response: any) => {
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
      task.Task_AssignDate = moment(task.Task_AssignDate)
        .startOf("hour")
        .fromNow();
      switch (task.Task_ActionTypeName) {
        case "Edit":
          if (task.Task_RelatedTo == "Master AI") {
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

  openTaskOwner(
    Task_ActionTypeName,
    Task_RelatedTo,
    Task_ActionDetails_Code,
    Task_Title,
    Task_AssignDate,
    Employee_Name,
    Task_AssignTo_Employee_Code,
    Task_Code
  ) {
    console.log(Task_ActionTypeName, "  ", Task_RelatedTo);
    const RoleOfTheTask: any = {};
    if (Task_ActionTypeName == "Edit") {
      RoleOfTheTask.Role_Code = 1;
    } else if (Task_ActionTypeName == "Review") {
      RoleOfTheTask.Role_Code = 2;
    } else if (Task_ActionTypeName == "Grammer Review") {
      RoleOfTheTask.Role_Code = 3;
    } else if (Task_ActionTypeName == "Publish") {
      RoleOfTheTask.Role_Code = 4;
    }
    if (Task_RelatedTo == "Master AI") {
      RoleOfTheTask.Role_Type_Code = 1;
      RoleOfTheTask.Sub_Role_Type = 1;
    } else if (Task_RelatedTo == "Master TN") {
      RoleOfTheTask.Role_Type_Code = 1;
      RoleOfTheTask.Sub_Role_Type = 2;
    } else if (Task_RelatedTo == "Country Clinical Data") {
      RoleOfTheTask.Role_Type_Code = 2;
      RoleOfTheTask.Sub_Role_Type = 3;
    } else if (Task_RelatedTo == "Country Non Clinical Data") {
      RoleOfTheTask.Role_Type_Code = 2;
      RoleOfTheTask.Sub_Role_Type = 4;
    }
    ///////determine country code
    if (RoleOfTheTask.Sub_Role_Type == 3 || RoleOfTheTask.Sub_Role_Type == 4) {
      var dataToSend: any = {};
      dataToSend.Task_RelatedTo = Task_RelatedTo;
      dataToSend.Task_ActionDetails_Code = Task_ActionDetails_Code;
      this.manageService.getCountryCode(dataToSend).subscribe((data: any) => {
        console.log("data from country", data);
        RoleOfTheTask.Country_Code = data[0].CountryBasedAIRevision_Country_ID; //not sure what is coming from server,might needs modification
      });
    } else {
      RoleOfTheTask.Country_Code = 0;
    }
    const EmployeeCanAssignList = [];
    this.manageService
      .getEmployeesWithUniversalRole(RoleOfTheTask)
      .subscribe((data: any) => {
        data.forEach(function(empElement) {
          if (empElement.Employee.Employee_Code != Task_AssignTo_Employee_Code)
            EmployeeCanAssignList.push(empElement.Employee);
        });
      });
    /* open dialog */
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = {
      title: "Change Task Owner",
      Task_RelatedTo: Task_RelatedTo,
      Task_Title: Task_Title,
      Task_AssignDate: Task_AssignDate,
      Employee_Name: Employee_Name,
      EmployeeCanAssignList: EmployeeCanAssignList,
      Task_Code: Task_Code
    };

    this.dialog.open(ChangeOwnerFormComponent, dialogConfig);
    ////
    console.log("RoleOfTheTask", RoleOfTheTask);
  }
}
