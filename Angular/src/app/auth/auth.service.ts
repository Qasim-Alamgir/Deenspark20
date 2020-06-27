import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Datatype} from './datatype';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}  
authetication(admin):Observable<any>{
  console.log(admin);
  return this.http.post<Datatype>(this.authUrl+'login', admin);
  
}
registeration(adduser):Observable<any>{
  console.log(adduser);
  return this.http.post<Datatype>(this.authUrl+'adduser', adduser);
  
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
