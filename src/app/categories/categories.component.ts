import { Component, OnInit, ViewChild  } from '@angular/core';
import { ICategory } from '../models/ICategory';
import { MatDialog, MatTable } from '@angular/material';
import { CategoriesDialogComponent } from '../categories-dialog/categories-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from './../services/categories.service';
import { PageEvent } from '@angular/material/paginator';

// let categoriesStatic: ICategory[] = [
//   {
//     id: 1,
//     name: "Clothes",
//     description: "Jackets, tops, shoes and more",
//     isActive: true
//   },
//   {
//     id: 2,
//     name: "Home Furnitures and Fixtures",
//     description: "Desks, chairs, bookcases, light fixtures and more",
//     isActive: true
//   },
//   {
//     id: 3,
//     name: "Jacket",
//     description: "Jackets for all weathers",
//     isActive: true
//   },
//   {
//     id: 4,
//     name: "Shoes",
//     description: "Shoes for all weathers",
//     isActive: true
//   },
//   {
//     id: 5,
//     name: "Desk",
//     description: "Desks made from all kinds of materials for all weathers",
//     isActive: true
//   },
//   {
//     id: 6,
//     name: "Light Fixture",
//     description: "Lamp, chandelier, and more",
//     isActive: true
//   },
//   {
//     id: 7,
//     name: "Food and Drinks",
//     description: "Food and Drinks",
//     isActive: true
//   }
// ];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  isSearchVisible: boolean = false;
  search: string = "";
  categories: ICategory[];
  columnsToDisplay: string[] = ['name', 'description', 'isActive', 'action'];

  // Paginator properties
  categoriesLength: number;
  categoriesSkip: number;
  pageEvent: PageEvent = new PageEvent();
  pageSize: number;

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private categoriesService: CategoriesService, 
              public dialog: MatDialog, 
              private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.updateCategoriesLength();
    this.pageSize = (this.pageEvent.pageSize > 0)  ? this.pageEvent.pageSize : 5;
    this.updateCategories();
  }

  nextPage(event: PageEvent) {
    this.pageEvent = event;
    this.pageSize = this.pageEvent.pageSize;
    this.updateCategories();
  }

  updateCategories(search: string = this.search,
                   skip: number = (this.pageEvent.pageIndex*this.pageSize),
                   count: number = this.pageSize) {
    let param:string = "?";

    if(search != "") {
      param += "search=" + search + "&";
    }

    if(skip > 0 ) {
      param += "skip=" + skip + "&";
    }
    
    if(count > 0) {
      param += "count=" + count;
    }

    return this.categoriesService.getCategories(param)
          .subscribe(data => {
                      this.categories = data;
                     },
                     error => console.log(error));
  }

  openDialog(action,category: ICategory) {
    category.action = action;
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      width: '40%',
      data:category
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        console.log(result.data);
        this.addCategory(result.data);
      }else if(result.event == 'Edit'){
        console.log(result.data);
        this.editCategory(result.data);
      }else if(result.event == 'Archive'){
        console.log(result.data);
        this.deleteCategory(result.data);
      }
    });
  }

  changeStatus(category: ICategory) {
    category.isActive = !category.isActive;
    this.editCategory(category);
  }

  addCategory(category: ICategory) {
    this.categoriesService.postCategory(category)
          .subscribe(() => {
            this.updateCategories();
            this.updateCategoriesLength();
          }, 
          error => console.log(error));
    this.openSnackBar("Successfully added category!", "Ok");
  }

  editCategory(category: ICategory) {
    this.categoriesService.updateCategory(category)
          .subscribe(() => {
            this.updateCategories();
            this.updateCategoriesLength();
          }, 
          error => console.log(error));
    this.openSnackBar("Successfully updated category!", "Ok");
  }

  deleteCategory(category: ICategory) {
    this.categoriesService.deleteCategory(category)
          .subscribe(() => { 
            this.updateCategories();
            this.updateCategoriesLength();
          },
          error => console.log(error));
    this.openSnackBar("Successfully archived category!", "Ok");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  showSearchBar() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  updateCategoriesLength() {
    this.categoriesService.getCategories()
      .subscribe(data => {
        this.categoriesLength = data.length;
      },
      error => console.log(error));
  }

  // updateCategories() {
  //   this.categories = [];

  //   if(this.search != "") {
  //     this.categories = categoriesStatic.filter(c => c.name.toLowerCase().includes(this.search.toLowerCase()) || 
  //                                               c.description.toLowerCase().includes(this.search.toLowerCase()));
  //   } else {
  //     this.categories = categoriesStatic;
  //   }
  //   console.log(this.search);
  //   console.log(this.categories);
  // }

}
