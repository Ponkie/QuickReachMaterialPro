import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent implements OnInit {

  action: string;
  user: IUser;
  constructor(
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IUser) {
    this.user = {...data};
    this.action = this.user.action;
  }

  ngOnInit() {
  }
 
  doAction(){
    this.dialogRef.close({
      event: this.action,data: this.user}
    );
  }
 
  closeDialog(){
    this.dialogRef.close({
      event:'Cancel'}
    );
  }

}
