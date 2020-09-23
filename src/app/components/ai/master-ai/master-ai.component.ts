import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from "@angular/material";
import { PageTitleService } from "../../../services/page-title.service";
import { MasterAiFormComponent } from "./master-ai-form/master-ai-form.component";
import { MasterAIService } from "../services/master-ai.service";
import { ProgressComponent } from "../ai-status-view/progress/progress.component";
import { AIViewComponent } from "../ai-status-view/view/view.component";
import { FormArray } from "@angular/forms";

@Component({
  selector: "app-master-ai",
  templateUrl: "./master-ai.component.html",
  styleUrls: ["./master-ai.component.css"]
})
export class MasterAiComponent implements OnInit {
  AIs;
  pharmaceuticalCategories;
  isLoading = true;
  searchKey: string;
  displayedColumns: string[] = [
    "AI status",
    "AI Name",
    "ATC Code",
    "Pharmacological Category",
    "Actions"
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog, private PageTitle: PageTitleService,
    public MasterAIService: MasterAIService
  ) {
  }

  ngOnInit() {
    this.PageTitle.ChangePageTitle('Master AI','Database');
    this.MasterAIService.getAIs().subscribe((AIs: []) => {
      this.isLoading = false;
      this.AIs = new MatTableDataSource(AIs);
      this.AIs.sort = this.sort;
      this.AIs.paginator = this.paginator;
      this.MasterAIService.getPharmacologicalCategories().subscribe(
        (datafomSevice: []) => {
          console.log("pharmaceutical categories ", datafomSevice);
          this.pharmaceuticalCategories = datafomSevice;
        }
      );
    });
    
  }
  onAdd() {
    this.MasterAIService.form.reset();
    //to clear form Arrays
    (this.MasterAIService.form.get("pharamaceutical") as FormArray).clear();
    (this.MasterAIService.form.get(
      "AI_Pharmaceutical_Categories_ID"
    ) as FormArray).clear();
    (this.MasterAIService.form.get("AI_ATC_Code") as FormArray).clear();
    (this.MasterAIService.form.get("AI_Alternative_Name") as FormArray).clear();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New AI", categories: this.pharmaceuticalCategories };
    this.dialog.open(MasterAiFormComponent, dialogConfig);
  }
  onEdit(element) {
    this.MasterAIService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit AI", categories: this.pharmaceuticalCategories };

    this.dialog.open(MasterAiFormComponent, dialogConfig);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.AIs.filter = this.searchKey.trim().toLowerCase();
  }
  rowClicked(element) {
    console.log("row clicked", element);
    //if (element.AI_Status != 1 && element.AI_Status != 3) {
      
          //open in progress modal
         // const dialogConfig = new MatDialogConfig();
         // dialogConfig.autoFocus = true;
         // dialogConfig.width = "95%";
         // dialogConfig.height = "95%";
          //dialogConfig.data = { task: response };
          //dialogConfig.panelClass = 'rxp-tab-custom-dialog';
        //  this.dialog.open(ProgressComponent, dialogConfig);
        
     // );
   // } else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
       dialogConfig.width = "95%";
       dialogConfig.height = "95%";
        dialogConfig.data = { aicode: element.AI_Code };
        dialogConfig.panelClass = 'rxp-tab-custom-dialog';
        this.dialog.open(AIViewComponent, dialogConfig);
      
   // }
  }
}
