import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  postHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  toggleLike( postId: number,userId: number): Observable<any>{
    return this.http.post<any>(`${environment.baseurl}like/add?postId=${postId}&userId=${userId}`,this.postHeader);
  }


}
