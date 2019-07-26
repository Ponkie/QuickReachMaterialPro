import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from '../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url: string = "https://localhost:5001/api/categories/"

  constructor(private http:HttpClient) { }

  getCategories(searchParam: string = "") : Observable<ICategory[]> {
    // console.log(this.url + searchParam);
    
    return this.http.get<ICategory[]>(this.url + searchParam)
                  .pipe(catchError(this.errorHandler));
  }

  postCategory(newCategory: ICategory) : Observable<ICategory> {
    return this.http.post<ICategory>(this.url, newCategory)
                  .pipe(catchError(this.errorHandler));
  }

  updateCategory(category: ICategory) : Observable<ICategory> {
    return this.http.put<ICategory>(this.url + category.id, category)
                  .pipe(catchError(this.errorHandler));
  }

  deleteCategory(category: ICategory) : Observable<ICategory> {
    return this.http.delete<ICategory>(this.url + category.id)
                  .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error")
  }

}
