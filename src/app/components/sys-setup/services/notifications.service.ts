import { Injectable, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class NotificationsService implements OnInit {
  constructor(private snackBar: MatSnackBar) {}
  ngOnInit(): void {}
  success(msg) {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
  failed(msg) {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}
