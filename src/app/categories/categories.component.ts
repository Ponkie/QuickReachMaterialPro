import { Component, OnInit, ViewChild  } from '@angular/core';
import { ICategory } from '../models/ICategory';
import { MatDialog, MatTable } from '@angular/material';
import { CategoriesDialogComponent } from '../categories-dialog/categories-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const categoriesStatic: ICategory[] = [
  {
    id: 1,
    name: "Clothes",
    description: "Jackets, tops, shoes and more",
    isActive: true
  },
  {
    id: 2,
    name: "Home Furnitures and Fixtures",
    description: "Desks, chairs, bookcases, light fixtures and more",
    isActive: true
  },
  {
    id: 3,
    name: "Jacket",
    description: "Jackets for all weathers",
    isActive: true
  },
  {
    id: 4,
    name: "Shoes",
    description: "Shoes for all weathers",
    isActive: true
  },
  {
    id: 5,
    name: "Desk",
    description: "Desks made from all kinds of materials for all weathers",
    isActive: true
  },
  {
    id: 6,
    name: "Light Fixture",
    description: "Lamp, chandelier, and more",
    isActive: true
  }
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  
  isSearchVisible: boolean = false;
  search: string;
  categories: ICategory[];
  columnsToDisplay: string[] = ['name', 'description', 'isActive', 'action'];

  @ViewChild(MatTable) table: MatTable<any>;


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  openDialog(action,category: ICategory) {
    category.action = action;
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      width: '40%',
      data:category
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        console.log(result.data);
        this.openSnackBar("Successfully added category!", "Ok");
      }else if(result.event == 'Edit'){
        console.log(result.data);
        this.openSnackBar("Successfully updated category!", "Ok");
      }else if(result.event == 'Archive'){
        console.log(result.data);
        this.openSnackBar("Successfully archived category!", "Ok");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.categories = categoriesStatic;
  }

  showSearchBar() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  updateCategories() {
    this.categories = [];

    if(this.search != "") {
      this.categories = categoriesStatic.filter(c => c.name.toLowerCase().includes(this.search.toLowerCase()) || 
                                                c.description.toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.categories = categoriesStatic;
    }
    console.log(this.search);
    console.log(this.categories);
  }

}
