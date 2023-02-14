import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  mySubject = new BehaviorSubject(false);
  val : number = 0;

  constructor() { }

clickEvent(){
  if (this.val == 0){
    this.mySubject.next(true);
    this.val++;
  } else{
    this.mySubject.next(false);
    this.val = 0;
  }
}

returnObservable() : Observable<boolean>{
  return this.mySubject;
}


}
