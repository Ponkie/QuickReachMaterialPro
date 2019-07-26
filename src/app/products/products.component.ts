import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { ProductsDialogComponent } from '../products-dialog/products-dialog.component';
import { IProduct } from '../models/IProduct';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from './../services/products.service';
import { PageEvent } from '@angular/material/paginator';

// const productsStatic: IProduct[] = [
//   {
//     id: 1,
//     name: "Leather Jacket",
//     description: "Upgrade your look with this Wilsons Leather Vintage sleek moto jacket.",
//     price: 5000,
//     imageUrl: "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665583819.jpg",
//     categories: [
//       {
//         id: 1,
//         name: "Clothes"
//       },
//       {
//         id: 3,
//         name: "Jacket"
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: "Ultraboost 19",
//     description: "Amp up your run with the adidas® Men’s Ultraboost running shoe.",
//     price: 6500,
//     imageUrl: "https://dks.scene7.com/is/image/GolfGalaxy/16ADIMLTRBSTMBLKWRNN_Black_Black_Grey?wid=1080&fmt=jpg",
//     categories: [
//       {
//         id: 4,
//         name: "Shoes"
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: "MALM Desk",
//     description: "The pull-out panel gives you an extra work surface. ",
//     price: 9000,
//     imageUrl: "https://www.ikea.com/us/en/images/products/malm-desk-with-pull-out-panel-black__0133386_PE288803_S4.JPG",
//     categories: [
//       {
//         id: 5,
//         name: "Desk"
//       }
//     ]   
//   },
//   {
//     id: 4,
//     name: "Dagotto",
//     description: "This foot-rest helps you sit in a good working position at your desk.",
//     price: 716,
//     imageUrl: "https://www.ikea.com/au/en/images/products/dagotto-foot-rest-black__0156454_PE315498_S4.JPG",
//     categories: [
//       {
//         id: 2,
//         name: "Home Furnitures and Fixtures"
//       }
//     ]
//   },
//   {
//     id: 5,
//     name: "Mango Juice Drink",
//     description: "Del Monte Quality Mango Juice Drink.",
//     price: 15,
//     imageUrl: "https://i5.walmartimages.com/asr/6d1621c6-ace4-476d-80af-e974285a75ab_1.ded5bea364f39a0ea4b6dd1822ae0b4b.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
//     categories: [
//       {
//         id: 7,
//         name: "Food and Drinks"
//       }
//     ]
//   }
// ]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isSearchVisible: boolean = false;
  search: string = "";
  products: IProduct[];
  columnsToDisplay: string[] = ['name', 'description', 'price', 'categories', 'imageUrl', 'action'];

  // Paginator properties
  productsLength: number;
  productsSkip: number;
  pageEvent: PageEvent = new PageEvent();
  pageSize: number;

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private productsService: ProductsService,
              public dialog: MatDialog, 
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.updateProductsLength();
    this.pageSize = (this.pageEvent.pageSize > 0)  ? this.pageEvent.pageSize : 5;
    this.updateProducts();
  }

  nextPage(event: PageEvent) {
    this.pageEvent = event;
    this.pageSize = this.pageEvent.pageSize;
    this.updateProducts();
  }
  
  updateProducts(search: string = this.search,
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

    return this.productsService.getProducts(param)
    .subscribe(data => {
          this.products = data;
          },
          error => console.log(error));
  }

  openDialog(action,product: IProduct) {
    product.action = action;
    const dialogRef = this.dialog.open(ProductsDialogComponent, {
      width: '40%',
      data:product
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        console.log(result.data);
        this.addProduct(result.data);
      }else if(result.event == 'Edit'){
        console.log(result.data);
        this.editProduct(result.data);
      }else if(result.event == 'Archive'){
        console.log(result.data);
        this.deleteProduct(result.data);
      }
    });
  }

  addProduct(product: IProduct) {
    this.productsService.postProduct(product)
          .subscribe(() => {
            this.updateProducts();
            this.updateProductsLength();
          }, 
          error => console.log(error));
    this.openSnackBar("Successfully added product!", "Ok");
  }

  editProduct(product: IProduct) {
    this.productsService.updateProduct(product)
          .subscribe(() => {
            this.updateProducts();
            this.updateProductsLength();
          }, 
          error => console.log(error));
    this.openSnackBar("Successfully updated product!", "Ok");
  }

  deleteProduct(product: IProduct) {
    this.productsService.deleteProduct(product)
          .subscribe(() => { 
            this.updateProducts();
            this.updateProductsLength();
          },
          error => console.log(error));
    this.openSnackBar("Successfully archived product!", "Ok");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  showSearchBar() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  updateProductsLength() {
    this.productsService.getProducts()
      .subscribe(data => {
        this.productsLength = data.length;
      },
      error => console.log(error));
  }

  // updateProducts() {
  //   this.products = [];

  //   if(this.search != "") {
  //     this.products = productsStatic.filter(p => p.name.toLowerCase().includes(this.search.toLowerCase()) || 
  //                                           p.description.toLowerCase().includes(this.search.toLowerCase()) ||
  //                                           p.price.toString().includes(this.search));
  //   } else {
  //     this.products = productsStatic;
  //   }
    
  //   console.log(this.products);
  // }

  

}
