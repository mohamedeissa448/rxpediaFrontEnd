import { Injectable } from "@angular/core";
import { systemSettings } from "../../app-config";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  logIn(credentials) {
    console.log(credentials);
    return this.http
      .post(systemSettings.serverCMSAuthURL, credentials)
      .pipe(
        map((response: any) => {
          console.log("response from server ", response);
          /*{
            "roles": ["sys-setup","other"],
            "name": "Wael",
            "iat": 1516239022
          }*/
          // response.token =
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJzeXMtc2V0dXAiLCJvdGhlciJdLCJuYW1lIjoiV2FlbCIsImlhdCI6MTUxNjIzOTAyMn0.5GfiS-NhqP3QGFoqStpKY4zHoV0HP_Zq2th3LBVePJY";
          if (response && response.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("LogedInUser",JSON.stringify(response.user));
            return true;
          }
          return false;
        })
      );
  }
  logOut() {
    this.router.navigate(["authentication/page-login"]);
    localStorage.removeItem("token");
  }
  isLogedIn() {
    let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("token");
    if (!token) return false;
    //console.log("token", token);
    // console.log("isexpired", jwtHelper.isTokenExpired(token));

    return !jwtHelper.isTokenExpired(token);
  }
  get currentUser() {
    let LogedInUser = localStorage.getItem("LogedInUser");
    if (!LogedInUser) return null;
    //console.log("decoded token ", new JwtHelperService().decodeToken(token));
    return JSON.parse(LogedInUser);
  }
}
