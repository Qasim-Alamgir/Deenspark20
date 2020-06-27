import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  addcategoryUrl = "http://localhost:3000/api/";

  //Services for Categories

  constructor(private http: HttpClient) {}  
addcategory(categoryname):Observable<any>{
  console.log(categoryname);
  return this.http.post<any>(this.addcategoryUrl+'addcategory', categoryname);
}

getCategory(): Observable<any> {
  return this.http.get<any>(this.addcategoryUrl +'getcategory');
}
    
updatecategory(_id,categoryname):Observable<any>{
  console.log(_id);
  
  return this.http.put<any>(this.addcategoryUrl + 'updatecategory/' + _id, categoryname);
  
}

delCategory (id): Observable<any> {
  return this.http.delete<any>(this.addcategoryUrl +'delcategory/' + id);
}

//Services for Movies

addMovies(formData):Observable<any>{
  return this.http.post<any>(this.addcategoryUrl+'addmovies', formData,{
    reportProgress: true,
    observe:'events'
  }).pipe(
    catchError(this.errorMgmt)
  )
}
errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

getMovies(): Observable<any> {
  return this.http.get<any>(this.addcategoryUrl +'getmovies');
}

delMovies(id): Observable<any> {
  return this.http.delete<any>(this.addcategoryUrl +'delmovies/' + id);
}
updateMovies(id,formData):Observable<any>{
  console.log(formData);
  return this.http.put<any>(this.addcategoryUrl + 'updatemovies/' + id, formData); 
}
getMovieList(catvalue): Observable<any> {
  console.log(catvalue)
  let obj = {
    catvalue : catvalue
  }
  return this.http.post<any>(this.addcategoryUrl +'getmovielist', obj);
}
getMovie(id): Observable<any> {
  console.log(id)
  let obj = {
    _id : id
  }
  return this.http.post<any>(this.addcategoryUrl +'getmovie', obj);
}
//Services for Users

getUser(): Observable<any> {
  return this.http.get<any>(this.addcategoryUrl +'getuser');
}

delUser(id): Observable<any> {
  return this.http.delete<any>(this.addcategoryUrl +'deluser/' + id);
}

// Services for Reports
userReport(): Observable<any> {
  return this.http.get<any>(this.addcategoryUrl +'userreport');
}
videoReport(): Observable<any> {
  return this.http.get<any>(this.addcategoryUrl +'videoreport');
}
}
