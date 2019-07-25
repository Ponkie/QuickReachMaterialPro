import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICategory } from '../models/ICategory';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.css']
})
export class CategoriesDialogComponent implements OnInit {

  action: string;
  category: ICategory;
 
  constructor(
    public dialogRef: MatDialogRef<CategoriesDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ICategory) {
    this.category = {...data};
    this.action = this.category.action;
  }

  ngOnInit() {
  }
 
  doAction(){
    this.dialogRef.close({
      event: this.action,data: this.category}
    );
  }
 
  closeDialog(){
    this.dialogRef.close({
      event:'Cancel'}
    );
  }

}
