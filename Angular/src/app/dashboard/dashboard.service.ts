import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  DashUrl = environment.API_URL;

  //Services for Categories

  constructor(private http: HttpClient) {}  
addcategory(categoryname):Observable<any>{
  console.log(categoryname);
  return this.http.post<any>(this.DashUrl+'addcategory', categoryname);
}

getCategory(): Observable<any> {
  return this.http.get<any>(this.DashUrl +'getcategory');
}
    
updatecategory(_id,categoryname):Observable<any>{
  return this.http.put<any>(this.DashUrl + 'updatecategory/' + _id, categoryname);
}

delCategory (id): Observable<any> {
  return this.http.delete<any>(this.DashUrl +'delcategory/' + id);
}

//Services for Movies

addMovies(formData):Observable<any>{
  return this.http.post<any>(this.DashUrl+'addmovies', formData,{
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
  return this.http.get<any>(this.DashUrl +'getmovies');
}

delMovies(id): Observable<any> {
  return this.http.delete<any>(this.DashUrl +'delmovies/' + id);
}
updateMovies(id,formData):Observable<any>{
  console.log(formData);
  return this.http.put<any>(this.DashUrl + 'updatemovies/' + id, formData); 
}
getMovieList(catvalue): Observable<any> {
  console.log(catvalue)
  let obj = {
    catvalue : catvalue
  }
  return this.http.post<any>(this.DashUrl +'getmovielist', obj);
}
getMovie(id): Observable<any> {
  console.log(id)
  let obj = {
    _id : id
  }
  return this.http.post<any>(this.DashUrl +'getmovie', obj);
}
//Services for Users

getUser(): Observable<any> {
  return this.http.get<any>(this.DashUrl +'getuser');
}

delUser(id): Observable<any> {
  return this.http.delete<any>(this.DashUrl +'deluser/' + id);
}

// Services for Reports
userReport(): Observable<any> {
  return this.http.get<any>(this.DashUrl +'userreport');
}
videoReport(): Observable<any> {
  return this.http.get<any>(this.DashUrl +'videoreport');
}

// Services for Subscription Plan
addSubPlan(plan):Observable<any>{
  return this.http.post<any>(this.DashUrl+'addsubplan', plan);
}
getSubPlan(): Observable<any> {
  return this.http.get<any>(this.DashUrl +'getsubplan');
}
updatePlan(_id,obj):Observable<any>{
  return this.http.put<any>(this.DashUrl + 'updateplan/' + _id, obj);
}
delPlan(id): Observable<any> {
  return this.http.delete<any>(this.DashUrl +'delplan/' + id);
}

}
