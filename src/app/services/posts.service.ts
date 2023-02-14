import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  postHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllPosts(): Observable<any[]>{
    return this.http.get<any>(`${environment.baseurl}post/all`).pipe(
      map((response)=>response)
    )
  }


  getMyLikedPostsId(userId: number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.baseurl}user/myLikedPosts?userId=${userId}`);
  }


  createPost(post : any, userId : number): Observable<any>{
    return this.http.post<any>(`${environment.baseurl}post/add?userId=${userId}`, post, this.postHeader);
  }


}
