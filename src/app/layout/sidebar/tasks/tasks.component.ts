import { Component,OnInit,Input,Output,EventEmitter,ChangeDetectorRef } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import * as moment from "moment";
import { Router } from '@angular/router';


@Component({
    selector: "app-mytask",
    templateUrl: "./tasks.component.html",
    styleUrls: ["./tasks.component.css"]
  })

export class MyTaskComponent implements OnInit {
    moment = moment;
    constructor(private tasksService: TasksService,private router:Router) {}
    GroupedTasksList:any;
    ngOnInit() {
        this.tasksService.currentUserGroupedTasksList.subscribe(taskList =>{
            this.GroupedTasksList = taskList;
            console.log("this.GroupedTasksList",this.GroupedTasksList)
        });
        this.tasksService.getUserAllTasksbyUserID();
    }
    goToRoute(task){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        if(task.Task_ActionTypeName=="Edit" && task.Task_RelatedTo== "Master AI")
            this.router.navigate([`/ai/master-ai-edit-clinical-data/${task.Task_Title}`], { 
                queryParams: {
                    Task_Title: task.Task_Title,
                    revisionid: task.Task_ActionDetails_Code,
                    taskid: task.Task_Code,
                    aicode: task.Task_RelatedTo_Code       
                }
            });
        else if(task.Task_ActionTypeName=="Review" && task.Task_RelatedTo== "Master AI")
            this.router.navigate([`/ai/master-ai-review-clinical-data/${task.Task_Title}`], { queryParams: {
                
                Task_Title: task.Task_Title,
                revisionid: task.Task_ActionDetails_Code,
                taskid: task.Task_Code,
                aicode: task.Task_RelatedTo_Code
                
        }});
        else if(task.Task_ActionTypeName=="Grammer Review" && task.Task_RelatedTo== "Master AI")

            this.router.navigate([`/ai/master-ai-grammer-clinical-data/${task.Task_Title}`], { queryParams: {
                
                Task_Title: task.Task_Title,
                revisionid: task.Task_ActionDetails_Code,
                taskid: task.Task_Code,
                aicode: task.Task_RelatedTo_Code
                
        }});
        else if(task.Task_ActionTypeName=="Publish" && task.Task_RelatedTo== "Master AI")

            this.router.navigate([`/ai/master-ai-publish-clinical-data/${task.Task_Title}`], { queryParams: {
                
                Task_Title: task.Task_Title,
                revisionid: task.Task_ActionDetails_Code,
                taskid: task.Task_Code,
                aicode: task.Task_RelatedTo_Code
                
        }});

        
        //star routes for master tn
        if(task.Task_ActionTypeName=="Edit" && task.Task_RelatedTo== "Master TN")
        this.router.navigate([`/tn/master-tn-edit-original-data/${task.Task_Title}`], { 
            queryParams: {
                Task_Title: task.Task_Title,
                revisionid: task.Task_ActionDetails_Code,
                taskid: task.Task_Code,
                tncode: task.Task_RelatedTo_Code       
            }
        });
    else if(task.Task_ActionTypeName=="Review" && task.Task_RelatedTo== "Master TN")
        this.router.navigate([`/tn/master-tn-review-original-data/${task.Task_Title}`], { queryParams: {
            
            Task_Title: task.Task_Title,
            revisionid: task.Task_ActionDetails_Code,
            taskid: task.Task_Code,
            tncode: task.Task_RelatedTo_Code
            
    }});
    else if(task.Task_ActionTypeName=="Publish" && task.Task_RelatedTo== "Master TN")

        this.router.navigate([`/tn/master-tn-publish-original-data/${task.Task_Title}`], { queryParams: {
            
            Task_Title: task.Task_Title,
            revisionid: task.Task_ActionDetails_Code,
            taskid: task.Task_Code,
            tncode: task.Task_RelatedTo_Code
            
    }});
        
    }
    // hasValue(grouptask){
    
    //     switch (grouptask.value) {
    //         case grouptask.value['Master AI'].length >0: 
    //             return true;
    //         case grouptask.value['Master TN'].length >0: 
    //           return true;
    //         case grouptask.value['Country Clinical Data'].length >0: 
    //             return true;
    //         case grouptask.value['Country Non Clinical Data'].length >0: 
    //             return true;
    //     }
    //     return false;
    // }
    
}
