import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  isLogged = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  postHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public register(user: any): Observable<any>{
    return this.http.post<any>(`${environment.baseurl}user/add`, user);
  }

  public login(email : string, password : string): Observable<any>{
    return this.http.get<any>(`${environment.baseurl}user/login?email=${email}&password=${password}`);
  }


  public setLocalStorage(user : any){
    localStorage.setItem(environment.login, JSON.stringify(user));
  }


  public removeLocalStorage(){
    localStorage.removeItem(environment.login);
  }


  public getLocalStorage(){
    const val = localStorage.getItem(environment.login);
    if (val){
      const obj = JSON.parse(val);
      return obj;
    }
    return null;
  }



}
