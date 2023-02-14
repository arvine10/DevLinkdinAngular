import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  getCommentsForPost(postId : number): Observable<any[]>{
    return this.http.get<any>(`${environment.baseurl}comment/all?postId=${postId}`);
  } 


  addCommentForPost(userId: number, 
                    postId : number, 
                    description: any) : Observable<any>{
    return this.http.post<any>(`${environment.baseurl}comment/add?userId=${userId}&postId=${postId}`, description,this.postHeader)
  }



}
