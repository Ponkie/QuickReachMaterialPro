import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { ProductsDialogComponent } from '../products-dialog/products-dialog.component';
import { IProduct } from '../models/IProduct';
import { MatSnackBar } from '@angular/material/snack-bar';

const productsStatic: IProduct[] = [
  {
    id: 1,
    name: "Leather Jacket",
    description: "Upgrade your look with this Wilsons Leather Vintage sleek moto jacket.",
    price: 5000,
    imageUrl: "https://image1.superdry.com/static/images/optimised/zoom/upload9223368955665583819.jpg"
  },
  {
    id: 2,
    name: "Ultraboost 19",
    description: "Amp up your run with the adidas® Men’s Ultraboost running shoe.",
    price: 6500,
    imageUrl: "https://dks.scene7.com/is/image/GolfGalaxy/16ADIMLTRBSTMBLKWRNN_Black_Black_Grey?wid=1080&fmt=jpg"
  },
  {
    id: 3,
    name: "MALM Desk",
    description: "The pull-out panel gives you an extra work surface. ",
    price: 9000,
    imageUrl: "https://www.ikea.com/us/en/images/products/malm-desk-with-pull-out-panel-black__0133386_PE288803_S4.JPG"
  },
  {
    id: 4,
    name: "Dagotto",
    description: "This foot-rest helps you sit in a good working position at your desk.",
    price: 716,
    imageUrl: "https://www.ikea.com/au/en/images/products/dagotto-foot-rest-black__0156454_PE315498_S4.JPG"
  },
  {
    id: 5,
    name: "Mango Juice Drink",
    description: "Del Monte Quality Mango Juice Drink.",
    price: 15,
    imageUrl: "https://i5.walmartimages.com/asr/6d1621c6-ace4-476d-80af-e974285a75ab_1.ded5bea364f39a0ea4b6dd1822ae0b4b.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
  }
]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  search: string;
  products: IProduct[];
  isSearchVisible: boolean = false;
  columnsToDisplay: string[] = ['name', 'description', 'price', 'imageUrl', 'action'];

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  openDialog(action,product: IProduct) {
    product.action = action;
    const dialogRef = this.dialog.open(ProductsDialogComponent, {
      width: '40%',
      data:product
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        console.log(result.data);
        this.openSnackBar("Successfully added product!", "Ok");
      }else if(result.event == 'Edit'){
        console.log(result.data);
        this.openSnackBar("Successfully updated product!", "Ok");
      }else if(result.event == 'Archive'){
        console.log(result.data);
        this.openSnackBar("Successfully archived product!", "Ok");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.products = productsStatic;
  }

  showSearchBar() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  updateProducts() {
    this.products = [];

    if(this.search != "") {
      this.products = productsStatic.filter(p => p.name.toLowerCase().includes(this.search.toLowerCase()) || 
                                            p.description.toLowerCase().includes(this.search.toLowerCase()) ||
                                            p.price.toString().includes(this.search));
    } else {
      this.products = productsStatic;
    }
    
    console.log(this.products);
  }

  

}
