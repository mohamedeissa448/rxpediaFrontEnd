import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MasterAIEditClinicalDataComponent } from '../components/ai/master-ai-edit-clinical-data/master-ai-edit-clinical-data.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateServiceMasterAIEditClinicalData implements CanDeactivate<MasterAIEditClinicalDataComponent>{

  constructor() { }
  canDeactivate(component: MasterAIEditClinicalDataComponent) {
    if(component.dataHasChanged()){
      return window.confirm('All unsaved data will be lost!. Are you sure you want to porceed?');
    }
    return true
  } 
  
}
