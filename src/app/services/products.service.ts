import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url: string = "https://localhost:5001/api/products/";

  constructor(private http: HttpClient) { }

  getProducts(searchParam: string = "") : Observable<IProduct[]> {
    // console.log(this.url + searchParam);
    return this.http.get<IProduct[]>(this.url + searchParam)
                .pipe(catchError(this.errorHandler));
  }

  postProduct(newProduct: IProduct) : Observable<IProduct> {
    return this.http.post<IProduct>(this.url, newProduct)
                  .pipe(catchError(this.errorHandler));
  }

  updateProduct(product: IProduct) : Observable<IProduct> {
    return this.http.put<IProduct>(this.url + product.id, product)
                  .pipe(catchError(this.errorHandler));
  }

  deleteProduct(product: IProduct) : Observable<IProduct> {
    return this.http.delete<IProduct>(this.url + product.id)
                  .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }
  
}
