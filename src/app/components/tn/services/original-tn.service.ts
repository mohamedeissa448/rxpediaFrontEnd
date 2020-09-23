import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "./../../../app-config";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OriginalTNService {

  constructor(private http: HttpClient) { }
  getTNRevisionByID(dataToSend){
   return this.http.post(`${systemSettings.serverURL}/getTNRevisionByID`,dataToSend)
  }
  AddTNToPublisher(dataToSend){
    return this.http.post(`${systemSettings.serverURL}/AddTNToPublisher`,dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  ReturnTaskTNToEditor(dataToSend){
    return this.http.post(`${systemSettings.serverURL}/ReturnTaskTNToEditor`,dataToSend)
    .pipe(
      map((response: any) => {
        console.log("ReturnTaskTNToEditor");
        console.log(response);
        if (response.message == true) return true;
        return false;
      })
    );
  }
  AddTNData(dataToSend){
    return this.http.post(`${systemSettings.serverURL}/AddTNData`,dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
}
