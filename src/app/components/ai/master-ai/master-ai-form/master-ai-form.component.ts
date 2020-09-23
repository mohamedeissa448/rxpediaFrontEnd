import { Component, OnInit, Inject } from "@angular/core";
import { NotificationsService } from "../../../sys-setup/services/notifications.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { MasterAIService } from "../../services/master-ai.service";
import { Observable } from "rxjs";
import { FormControl, FormArray } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
@Component({
  selector: "app-master-ai-form",
  templateUrl: "./master-ai-form.component.html",
  styleUrls: ["./master-ai-form.component.css"]
})
export class MasterAiFormComponent implements OnInit {
  //for form categories autocomplete
  myControl = new FormControl();
  options: any[];
  filteredOptions: Observable<any[]>;
  //end
  title;
  constructor(
    public MasterAIService: MasterAIService,
    private notificationService: NotificationsService,
    private dialogRef: MatDialogRef<MasterAiFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
  }

  ngOnInit() {
    this.MasterAIService.getPharmacologicalCategories().subscribe((dataFromService:any) =>{
      this.options = dataFromService.filter(category =>
        category.hasOwnProperty("Pharmaceutical_Category_Name")
      );
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value =>
        typeof value === "string" ? value : value.Pharmaceutical_Category_Name
      ),
      map(Pharmaceutical_Category_Name =>
        Pharmaceutical_Category_Name
          ? this._filter(Pharmaceutical_Category_Name)
          : this.options.slice()
      )
    );
  }
  displayFn(category): string {
    return category && category.Pharmaceutical_Category_Name
      ? category.Pharmaceutical_Category_Name
      : "";
  }

  private _filter(categoryName: string): any[] {
    const filterValue = categoryName.trim().toLowerCase();

    return this.options.filter(
      option =>
        option.Pharmaceutical_Category_Name.trim()
          .toLowerCase()
          .indexOf(filterValue) >= 0
    );
  }
  addSelectedCategory() {
    console.log("category selected", this.myControl.value);
    if (this.myControl.value) {
      this.MasterAIService.addSelectedCategory(this.myControl.value);
      this.myControl.setValue("");
    }
  }
  deleteSelectedCategory(event) {
    console.log(
      "category deleted",
      event.toElement.parentNode.children[0].innerText
    );
    this.MasterAIService.deleteSelectedCategory(
      event.toElement.parentNode.children[0].innerText,
      event.toElement.parentNode.children[1].innerText
    );
  }

  fff(newName) {
    console.log("clicjed me");
    this.MasterAIService.addAlternativeName(newName);
  }
  deleteName(i) {
    console.log("index to delete", i);
    this.MasterAIService.deleteAlternativeName(i);
  }

  deleteAlternativeName() {
    console.log("category selected", this.myControl.value);
    if (this.myControl.value) {
      this.MasterAIService.addSelectedCategory(this.myControl.value);
      this.myControl.setValue("");
    }
  }
  onClear() {
    this.MasterAIService.form.reset();
  }

  onSubmit() {
    if (this.MasterAIService.form.valid) {
      //on adding AI
      if (this.title === "Add New AI") {
        this.MasterAIService.addAI(this.MasterAIService.form.value);
        this.notificationService.success(":: Added Successfully");
      } else if (this.title === "Edit AI") {
        //update AI
        this.MasterAIService.updateAI(this.MasterAIService.form.value);
        this.notificationService.success(":: Updated Successfully");
      }
      this.MasterAIService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.MasterAIService.form.reset();
    //to clear form Arrays
    (this.MasterAIService.form.get("pharamaceutical") as FormArray).clear();
    (this.MasterAIService.form.get(
      "AI_Pharmaceutical_Categories_ID"
    ) as FormArray).clear();
    (this.MasterAIService.form.get("AI_ATC_Code") as FormArray).clear();
    (this.MasterAIService.form.get("AI_Alternative_Name") as FormArray).clear();

    this.dialogRef.close();
  }
}
