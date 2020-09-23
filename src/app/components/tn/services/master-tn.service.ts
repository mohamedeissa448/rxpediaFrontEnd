import { systemSettings } from "./../../../app-config";
import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../../authentication/services/auth.service";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})
export class MasterTnService {
  form: FormGroup;
  title: string;
  constructor(private http: HttpClient, private AuthService: AuthService) {
    this.form = new FormGroup({
      _id: new FormControl(""),
      TN_Name: new FormControl(""),
      TN_ActiveIngredientsIDs: new FormArray([]),
      TN_ActiveIngredients: new FormArray([]), //
      TN_Form_ID: new FormArray([]),
      TN_Route_ID: new FormArray([]),
      TN_ActualActiveIngredientsIDs: new FormArray([]),
      TN_ActualActiveIngredientsObjects: new FormArray([]),
      TN_Data_Strength: new FormArray([]),
      TN_Weight_Unit_ID: new FormControl(),
      TN_Weight_Value: new FormControl(),
      TN_Volume_Unit_ID: new FormControl(),
      TN_Volume_Value: new FormControl(),
      TN_Concentration_Value: new FormControl(),
      TN_Concentration_Unit_ID: new FormControl(),
      TN_Countries: new FormArray([]),
      TN_Country_Data: new FormArray([]),
      TN_Country_IDs: new FormArray([])
    });
  }

  getTNfilterByLetter(letter) {
    return this.http.post(`${systemSettings.serverURL}/getTNfilterByLetter`, {
      letter: letter
    });
  }
  getAllAIminiData() {
    return this.http.get(`${systemSettings.serverURL}/getAllAIminiData`);
  }
  getForm() {
    return this.http.get(`${systemSettings.serverURL}/getForm`);
  }
  getRoute() {
    return this.http.get(`${systemSettings.serverURL}/getRoute`);
  }
  getCountries() {
    return this.http.get(`${systemSettings.serverURL}/getCountries`);
  }
  getStrengthUnits() {
    return this.http.get(`${systemSettings.serverURL}/getStrengthUnits`);
  }
  getWeightUnits() {
    return this.http.get(`${systemSettings.serverURL}/getWeightUnits`);
  }
  getVolumeUnits() {
    return this.http.get(`${systemSettings.serverURL}/getVolumeUnits`);
  }
  getConcentration() {
    return this.http.get(`${systemSettings.serverURL}/getConcentration`);
  }

  addTNRevision(TN) {
    console.log("added", TN);
    console.log("id of current user", this.AuthService.currentUser);
    return this.http
      .post(`${systemSettings.serverURL}/addTNRevision`, {
        TNRevision_EditedBy_Employee_ID: this.AuthService.currentUser
          .User_Employee_ID, //not sure
        TN_ActiveIngredients: TN.TN_ActiveIngredients,
        TN_ActiveIngredientsIDs: TN.TN_ActiveIngredientsIDs,
        TN_ActualActiveIngredientsIDs: TN.TN_ActualActiveIngredientsIDs,
        TN_ActualActiveIngredientsObjects: TN.TN_ActualActiveIngredientsObjects,
        TN_Concentration_Unit_ID: TN.TN_Concentration_Unit_ID.toString(),
        TN_Concentration_Value: Number(TN.TN_Concentration_Value),
        TN_Countries: TN.TN_Countries,
        TN_Country_Data: TN.TN_Country_Data,
        TN_Country_IDs: TN.TN_Country_IDs,
        TN_Data_Strength: TN.TN_Data_Strength,
        TN_Form_ID: TN.TN_Form_ID[0].Form_Code,
        TN_Name: TN.TN_Name,
        TN_Route_ID: TN.TN_Route_ID[0].Route_Code,
        TN_Volume_Unit_ID: TN.TN_Volume_Unit_ID.toString(),
        TN_Volume_Value: Number(TN.TN_Volume_Value),
        TN_Weight_Unit_ID: TN.TN_Weight_Unit_ID.toString(),
        TN_Weight_Value: Number(TN.TN_Weight_Value)
      })
      .subscribe(x => {});
  }
  updateTN(updatedTN) {
    this.http
      .post(`${systemSettings.serverURL}/addTNRevisionToEditAfterPublished`, {
        TNRevision_EditedBy_Employee_ID: this.AuthService.currentUser
          .User_Employee_ID, //not sure
        TN_Country_ID: updatedTN.TN_Country_IDs,
        TN_Country_Data: updatedTN.TN_Country_Data,
        TN_Country_IDs: updatedTN.TN_Country_IDs,
        TN_Countries: updatedTN.TN_Countries,
        TN_Route_ID: updatedTN.TN_Route_ID[0].Route_Code,
        TN_Form_ID: updatedTN.TN_Form_ID[0].Form_Code,
        TN_ActiveIngredients: updatedTN.TN_ActiveIngredients,
        TN_ActiveIngredientsIDs: updatedTN.TN_ActiveIngredientsIDs,
        TN_ActualActiveIngredientsIDs: updatedTN.TN_ActualActiveIngredientsIDs,
        TN_ActualActiveIngredientsObjects:
          updatedTN.TN_ActualActiveIngredientsObjects,
        TN_Concentration_Unit_ID: updatedTN.TN_Concentration_Unit_ID.toString(),//
        TN_Concentration_Value: Number(updatedTN.TN_Concentration_Value),//
        TN_Data_Strength: updatedTN.TN_Data_Strength,
        TN_Name: updatedTN.TN_Name,
        TN_Volume_Unit_ID: updatedTN.TN_Volume_Unit_ID.toString(),//
        TN_Volume_Value: Number(updatedTN.TN_Volume_Value),//
        TN_Weight_Unit_ID: updatedTN.TN_Weight_Unit_ID.toString(),//
        TN_Weight_Value: Number(updatedTN.TN_Weight_Value)//
      })
      .subscribe(x => {});
  }
  EditTNRevision(){
    return this.http
    .post(`${systemSettings.serverAIURL}/EditTNRevision`, {
      TNRevision_EditedBy_Employee_ID: this.AuthService.currentUser
      .User_Employee_ID, //not sure
    TN_Country_ID: this.form.value.TN_Country_IDs,
    TN_Country_Data: this.form.value.TN_Country_Data,
    TN_Country_IDs: this.form.value.TN_Country_IDs,
    TN_Countries: this.form.value.TN_Countries,
    TN_Route_ID: this.form.value.TN_Route_ID[0].Route_Code,
    TN_Form_ID: this.form.value.TN_Form_ID[0].Form_Code,
    TN_ActiveIngredients: this.form.value.TN_ActiveIngredients,
    TN_ActiveIngredientsIDs: this.form.value.TN_ActiveIngredientsIDs,
    TN_ActualActiveIngredientsIDs: this.form.value.TN_ActualActiveIngredientsIDs,
    TN_ActualActiveIngredientsObjects:
      this.form.value.TN_ActualActiveIngredientsObjects,
    TN_Concentration_Unit_ID: this.form.value.TN_Concentration_Unit_ID.toString(),//
    TN_Concentration_Value: Number(this.form.value.TN_Concentration_Value),//
    TN_Data_Strength: this.form.value.TN_Data_Strength,
    TN_Name: this.form.value.TN_Name,
    TN_Volume_Unit_ID: this.form.value.TN_Volume_Unit_ID.toString(),//
    TN_Volume_Value: Number(this.form.value.TN_Volume_Value),//
    TN_Weight_Unit_ID: this.form.value.TN_Weight_Unit_ID.toString(),//
    TN_Weight_Value: Number(this.form.value.TN_Weight_Value),//
    type: "AfterPublish"
    })
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  popualteForm(TN) {
    console.log("populated TN", TN);
    setTimeout(() => {
      this.form.patchValue({
        _id: TN._id,
        TN_Name: TN.TN_Name,
        TN_Weight_Unit_ID: TN.TN_Weight_Unit_ID,
        TN_Weight_Value: TN.TN_Weight_Value,
        TN_Volume_Unit_ID: TN.TN_Volume_Unit_ID,
        TN_Volume_Value: TN.TN_Volume_Value,
        TN_Concentration_Value: TN.TN_Concentration_Value,
        TN_Concentration_Unit_ID: TN.TN_Concentration_Unit_ID
      });
    });

    TN.ai.forEach(element => {
      (this.form.get("TN_ActiveIngredients") as FormArray).push(
        new FormControl({
          AI_Code: element.AI_Code,
          AI_Name: element.AI_Name
        })
      );
      (this.form.get("TN_ActiveIngredientsIDs") as FormArray).push(
        new FormControl(element.AI_Code)
      );
    });

    TN.ActualAI.forEach(element => {
      (this.form.get("TN_ActualActiveIngredientsIDs") as FormArray).push(
        new FormControl(element.AI_Code)
      );
      (this.form.get("TN_ActualActiveIngredientsObjects") as FormArray).push(
        new FormControl({
          AI_Code: element.AI_Code,
          AI_Name: element.AI_Name
        })
      );
    });

    //countries
    TN.country.forEach(element => {
      (this.form.get("TN_Countries") as FormArray).push(
        new FormControl({
          Country_Code: element.Country_Code,
          Country_Name: element.Country_Name
        })
      );
    });

    TN.TN_Country_Data.forEach(element => {
      (this.form.get("TN_Country_Data") as FormArray).push(
        new FormControl({
          TN_Data_Country_ID: element.TN_Data_Country_ID,
          TN_Data_Country_FullName: element.TN_Data_Country_FullName
        })
      );
      (this.form.get("TN_Country_IDs") as FormArray).push(
        new FormControl(element.TN_Data_Country_ID)
      );
    });
    /****** Strengths */
    TN.TN_Data_Strength.forEach(element => {
      (this.form.get("TN_Data_Strength") as FormArray).push(
        new FormControl({
          TN_Data_Strength_AI_ID: element.TN_Data_Strength_AI_ID,
          TN_Data_Strength_Value: element.TN_Data_Strength_Value,
          TN_Data_Strength_Unite_ID: element.TN_Data_Strength_Unite_ID
        })
      );
    });
    /*******Form */
    (this.form.get("TN_Form_ID") as FormArray).push(
      new FormControl({
        Form_Code: TN.form.Form_Code,
        Form_Name: TN.form.Form_Name
      })
    );
    /******** Route */

    (this.form.get("TN_Route_ID") as FormArray).push(
      new FormControl({
        Route_Code: TN.route.Route_Code,
        Route_Name: TN.route.Route_Name
      })
    );
    //this.form.setControl("pharamaceutical", this.form.get("pharamaceutical"));
    console.log("form after set to edit", this.form);
  }
  addSelectedActiveIngredient(activeIngredient) {
    (this.form.get("TN_ActiveIngredientsIDs") as FormArray).push(
      new FormControl(activeIngredient.AI_Code)
    );
    (this.form.get("TN_ActiveIngredients") as FormArray).push(
      new FormControl({
        AI_Code: activeIngredient.AI_Code,
        AI_Name: activeIngredient.AI_Name
      })
    );
    console.log(
      "after add : TN_ActiveIngredientsIDs",
      this.form.get("TN_ActiveIngredientsIDs").value
    );
    console.log(
      "after add: TN_ActiveIngredients",
      this.form.get("TN_ActiveIngredients").value
    );
  }
  deleteSelectedActiveIngredient(AI_Code) {
    let index = -1;
    (this.form.get("TN_ActiveIngredientsIDs") as FormArray).controls.forEach(
      control => {
        if (control.value == AI_Code) {
          index = (this.form.get(
            "TN_ActiveIngredientsIDs"
          ) as FormArray).controls.indexOf(control);
          (this.form.get("TN_ActiveIngredientsIDs") as FormArray).removeAt(
            index
          );
        }
      }
    );

    (this.form.get("TN_ActiveIngredients") as FormArray).controls.forEach(
      control => {
        if (control.value.AI_Code == AI_Code) {
          index = (this.form.get(
            "TN_ActiveIngredients"
          ) as FormArray).controls.indexOf(control);
          (this.form.get("TN_ActiveIngredients") as FormArray).removeAt(index);
        }
      }
    );
    console.log(
      "after remove: TN_ActiveIngredientsIDs",
      this.form.get("TN_ActiveIngredientsIDs").value
    );
    console.log(
      "after remove: TN_ActiveIngredients",
      this.form.get("TN_ActiveIngredients").value
    );
  }

  addSelectedCountry(country) {
    (this.form.get("TN_Country_IDs") as FormArray).push(
      new FormControl(country.Country_Code)
    );
    (this.form.get("TN_Country_Data") as FormArray).push(
      new FormControl({
        TN_Data_Country_ID: country.Country_Code,
        TN_Data_Country_FullName: ""
      })
    );
    (this.form.get("TN_Countries") as FormArray).push(
      new FormControl({
        Country_Code: country.Country_Code,
        Country_Name: country.Country_Name
      })
    );
    console.log(
      "after add : TN_Country_Data",
      this.form.get("TN_Country_Data").value
    );
    console.log(
      "after add: TN_Country_IDs",
      this.form.get("TN_Country_IDs").value
    );
    console.log("after add: TN_Countries", this.form.get("TN_Countries").value);
    console.log(
      "vvvvvvvvvvv",
      (this.form.get("TN_Countries") as FormArray).controls
    );
  }
  deleteSelectedCountry(Country_Code) {
    let index = -1;
    (this.form.get("TN_Country_IDs") as FormArray).controls.forEach(control => {
      if (control.value == Country_Code) {
        index = (this.form.get("TN_Country_IDs") as FormArray).controls.indexOf(
          control
        );
        (this.form.get("TN_Country_IDs") as FormArray).removeAt(index);
      }
    });

    (this.form.get("TN_Country_Data") as FormArray).controls.forEach(
      control => {
        if (control.value.TN_Data_Country_ID == Country_Code) {
          index = (this.form.get(
            "TN_Country_Data"
          ) as FormArray).controls.indexOf(control);
          (this.form.get("TN_Country_Data") as FormArray).removeAt(index);
        }
      }
    );
    (this.form.get("TN_Countries") as FormArray).controls.forEach(control => {
      if (control.value.Country_Code == Country_Code) {
        index = (this.form.get("TN_Countries") as FormArray).controls.indexOf(
          control
        );
        (this.form.get("TN_Countries") as FormArray).removeAt(index);
      }
    });
    console.log(
      "after remove: TN_Countries",
      this.form.get("TN_Countries").value
    );
    console.log(
      "after remove: TN_Country_IDs",
      this.form.get("TN_Country_IDs").value
    );
    console.log(
      "after remove: TN_Country_Data",
      this.form.get("TN_Country_Data").value
    );
  }
  addSelectedForm(form) {
    console.log(
      '(this.form.get("TN_Form_ID") as FormArray).controls.length',
      (this.form.get("TN_Form_ID") as FormArray).controls.length
    );
    if ((this.form.get("TN_Form_ID") as FormArray).controls.length == 0) {
      (this.form.get("TN_Form_ID") as FormArray).push(new FormControl(form));

      console.log("after add : TN_Form_ID", this.form.get("TN_Form_ID").value);
    }
  }
  deleteSelectedForm(TN_Form_ID) {
    let index = -1;
    (this.form.get("TN_Form_ID") as FormArray).controls.forEach(control => {
      console.log("control", control);
      if (control.value.Form_Code == TN_Form_ID) {
        index = (this.form.get("TN_Form_ID") as FormArray).controls.indexOf(
          control
        );
        (this.form.get("TN_Form_ID") as FormArray).removeAt(index);
      }
    });
    console.log("after remove: TN_Form_ID", this.form.get("TN_Form_ID").value);
  }
  //TN_Route_ID
  addSelectedRoute(route) {
    console.log(
      '(this.form.get("TN_Route_ID") as FormArray).controls.length',
      (this.form.get("TN_Route_ID") as FormArray).controls.length
    );
    if ((this.form.get("TN_Route_ID") as FormArray).controls.length == 0) {
      (this.form.get("TN_Route_ID") as FormArray).push(new FormControl(route));

      console.log(
        "after add : TN_Route_ID",
        this.form.get("TN_Route_ID").value
      );
    }
  }
  deleteSelectedRoute(TN_Route_ID) {
    let index = -1;
    (this.form.get("TN_Route_ID") as FormArray).controls.forEach(control => {
      console.log("control", control);
      if (control.value.Route_Code == TN_Route_ID) {
        index = (this.form.get("TN_Route_ID") as FormArray).controls.indexOf(
          control
        );
        (this.form.get("TN_Route_ID") as FormArray).removeAt(index);
      }
    });
    console.log(
      "after remove: TN_Route_ID",
      this.form.get("TN_Route_ID").value
    );
  }
  addSelectedStrength(activeIngredient) {
    (this.form.get("TN_ActualActiveIngredientsIDs") as FormArray).push(
      new FormControl(activeIngredient.AI_Code)
    );
    (this.form.get("TN_ActualActiveIngredientsObjects") as FormArray).push(
      new FormControl({
        AI_Code: activeIngredient.AI_Code,
        AI_Name: activeIngredient.AI_Name
      })
    );
    (this.form.get("TN_Data_Strength") as FormArray).push(
      new FormControl({
        TN_Data_Strength_AI_ID: activeIngredient.AI_Code,
        TN_Data_Strength_Value: 0,
        TN_Data_Strength_Unite_ID: 0
      })
    );
    console.log(
      "after add : TN_ActualActiveIngredientsIDs",
      this.form.get("TN_ActualActiveIngredientsIDs").value
    );
    console.log(
      "after add: TN_ActualActiveIngredientsObjects",
      this.form.get("TN_ActualActiveIngredientsObjects").value
    );
    console.log(
      "after add: TN_Data_Strength",
      this.form.get("TN_Data_Strength").value
    );
    console.log(
      "test : TN_Data_Strength",
      (this.form.get("TN_Data_Strength") as FormArray).controls[0].value
        .TN_Data_Strength_Value
    );
  }
  deleteSelectedStrength(AI_Code) {
    let index = -1;
    (this.form.get(
      "TN_ActualActiveIngredientsIDs"
    ) as FormArray).controls.forEach(control => {
      if (control.value == AI_Code) {
        index = (this.form.get(
          "TN_ActualActiveIngredientsIDs"
        ) as FormArray).controls.indexOf(control);
        (this.form.get("TN_ActualActiveIngredientsIDs") as FormArray).removeAt(
          index
        );
      }
    });

    (this.form.get(
      "TN_ActualActiveIngredientsObjects"
    ) as FormArray).controls.forEach(control => {
      if (control.value.AI_Code == AI_Code) {
        index = (this.form.get(
          "TN_ActualActiveIngredientsObjects"
        ) as FormArray).controls.indexOf(control);
        (this.form.get(
          "TN_ActualActiveIngredientsObjects"
        ) as FormArray).removeAt(index);
      }
    });
    (this.form.get("TN_Data_Strength") as FormArray).controls.forEach(
      control => {
        if (control.value.TN_Data_Strength_AI_ID == AI_Code) {
          index = (this.form.get(
            "TN_Data_Strength"
          ) as FormArray).controls.indexOf(control);
          (this.form.get("TN_Data_Strength") as FormArray).removeAt(index);
        }
      }
    );
    console.log(
      "after remove: TN_ActualActiveIngredientsIDs",
      this.form.get("TN_ActualActiveIngredientsIDs").value
    );
    console.log(
      "after remove: TN_ActualActiveIngredientsObjects",
      this.form.get("TN_ActualActiveIngredientsObjects").value
    );

    console.log(
      "after remove: TN_Data_Strength",
      this.form.get("TN_Data_Strength").value
    );
  }
  addAlternativeName(newName) {
    /*(this.form.get("AI_Alternative_Name") as FormArray).push(
      //this.fb.control("")
    );*/
  }

  deleteAlternativeName(indexToDelete) {
    (this.form.get("AI_Alternative_Name") as FormArray).removeAt(indexToDelete);
  }

  getTaskByAICode(AICode) {
    return this.http.post(`${systemSettings.serverURL}/getTaskByAICode`, {
      ai_id: AICode
    });
  }
  getAIMasterFieldStructure() {
    return this.http.get(
      `${systemSettings.serverAIURL}/getAIMasterFieldStructure`
    );
  }
  getPharmacologicalCategories() {
    return this.http.get(
      `${systemSettings.serverAIURL}/getPharmaceuticalCategory`
    );
  }
  getTNRevisionByID(dataToSend){
    return this.http.post(
      `${systemSettings.serverTNURL}/getTNRevisionByID`,dataToSend
    );
  }
}
