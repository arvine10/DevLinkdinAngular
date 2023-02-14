import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

 
  postHeader = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  constructor(private http : HttpClient) { }

  getUserById(userId : number): Observable<any>{
    return this.http.get<any>(`${environment.baseurl}user/${userId}`);
  }


  // delete these 2 functions: 
  getProfileByUserId(userId : number): Observable<any>{
    return this.http.get<any>(`${environment.baseurl}experience/${userId}`);
  }


  addProfileToUser(userId : number, profile : any):Observable<any>{
    return this.http.post<any>(`${environment.baseurl}experience/add?userId=${userId}`, profile, this.postHeader);
  }


}
