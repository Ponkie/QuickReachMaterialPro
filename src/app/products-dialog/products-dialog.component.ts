import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IProduct } from '../models/IProduct';
import { FormControl, FormGroupDirective, NgForm, Validators, Form } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.css']
})
export class ProductsDialogComponent implements OnInit {
  
  action: string;
  product: IProduct;
  nameFormControl: FormControl;
 
  constructor(
    public dialogRef: MatDialogRef<ProductsDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IProduct) {
    this.product = {...data};
    this.action = this.product.action;
  }

  ngOnInit() {
    this.nameFormControl = new FormControl('', [
      Validators.required
    ]);
  }
 
  doAction(){
    this.dialogRef.close({
      event: this.action,data: this.product}
    );
  }
 
  closeDialog(){
    this.dialogRef.close({
      event:'Cancel'}
    );
  }

}
