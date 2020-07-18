import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import {Datatype} from './datatype';
import {environment} from '../../environments/environment';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.API_URL;
  tokan = 'Bearer A21AAHS6UcZvJn0YvvzlwDxjykUOEZHLz0OtUe8j14OdI-LiDc3-dz02U7NERjNMwTR9WlywJFANoi1rY8B5jXoQn_Xw3xNyg';

  constructor(private http: HttpClient) {}  
authetication(admin):Observable<any>{
  console.log(admin);
  return this.http.post<Datatype>(this.authUrl+'login', admin);
  
}

registeration(adduser,subscriptionID):Observable<any>{
  console.log(adduser,subscriptionID);
  let obj = {
    fname : adduser.fname,
    lname : adduser.lname,
    email : adduser.email,
    address : adduser.address,
    password : adduser.password,
    order : subscriptionID
  }
  return this.http.post<Datatype>(this.authUrl+'adduser', obj);
}

transaction(id):Observable<any> {
  console.log(id)
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.tokan
   });
let options = { headers: headers };
return this.http.get('https://api.sandbox.paypal.com/v1/billing/subscriptions/'+id, options)
}

getTokan():Observable<any>{
  let headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',  
    'Authorization': 'Basic Ac-ttV2e8UuSw1Kkd1sDY10M6MJ3ZhA3o3Ob4Lt4DBfIYbIh9vbAkQWw0rACEg4_eACDfL04tay-n4EJEIHPjfFmiRgBafDH0kGCEcrnBs96A04SAXWamZ4GPH1kEOU2kov_p6z5JboeHQk1tGepegDbHktrXu98'
   });
   let options = { headers: headers };
return this.http.post('https://api.sandbox.paypal.com/v1/oauth2/token','{grant_type=client_credentials}', options)
}
reminderEmail(email,date):Observable<any>{
  let obj = {
    email : email,
    date : date
  }
  return this.http.post<any>(this.authUrl +'remainderemail', obj);
}
userLogin(login): Observable<any> {
  return this.http.post<any>(this.authUrl +'userLogin', login);
}
reset(reset): Observable<any> {
  console.log(reset)
  return this.http.post<any>(this.authUrl +'reset', reset);
}
getUser(data): Observable<any> {
  return this.http.get<any>(this.authUrl +'getuser', data);
}

checkPassword(oldPassword, id): Observable<any> {
  let obj = {
    id : id,
    oldPassword : oldPassword
  }
  console.log(obj)
  return this.http.post<any>(this.authUrl +'checkpassword', obj);
}
changePassword(id, newPassword):Observable<any>{
  let obj = {
    password : newPassword
  }
  console.log(obj)
  return this.http.put<any>(this.authUrl + 'changepassword/' + id, obj);  
}
editInfo(form,id):Observable<any>{
  console.log(form)
  return this.http.put<any>(this.authUrl + 'editinfo/' + id, form);  
}
activate(temptoken):Observable<any>{
  let token = {
    token : temptoken
  }
  console.log(token)
  return this.http.post<any>(this.authUrl + 'activate', token);  
}
}
