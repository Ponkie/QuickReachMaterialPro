import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  products: IProduct[] = [
    {
      id: 1,
      name: "Leather Jacket",
      description: "Upgrade your look with this Wilsons Leather Vintage sleek moto jacket, styled in genuine leather with seam details and two convenient snap hand pockets. It's the perfect amount of edge to pair with a pair of jeans and casual shoes.",
      price: 5000,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRftFmo8E66rmPAJ4ahOcaIsRO19hgo2UwI2cGHMpovrIVzvVDjGQ"
    },
    {
      id: 2,
      name: "Ultraboost 19",
      description: "Amp up your run with the adidas® Men’s Ultraboost running shoe. Designed with unique energy-returning boost™ technology, this technical running shoe features 20% more boost cushioning material than ever before.",
      price: 6500,
      imageUrl: "https://dks.scene7.com/is/image/GolfGalaxy/16ADIMLTRBSTMBLKWRNN_Black_Black_Grey?wid=1080&fmt=jpg"
    },
    {
      id: 3,
      name: "MALM Desk",
      description: "The pull-out panel gives you an extra work surface. You can collect cables and extension cords on the shelf under the table top, so they’re hidden but still close at hand.",
      price: 9000,
      imageUrl: "https://www.ikea.com/us/en/images/products/malm-desk-with-pull-out-panel-black__0133386_PE288803_S4.JPG"
    }
  ]

}

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
