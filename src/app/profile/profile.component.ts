import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AccessService } from '../services/access.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private profileService : ProfileService,
              private access : AccessService,
              private http: HttpClient,
              private route : Router) { }
  
  porfileInfo : any;
  userInfo : any;
  displayFollowBtn : boolean | undefined;
  displayEditBtn : boolean | undefined;
  experienceList : any[] = [];
  baseUrl = "https://logo.clearbit.com/";
  img : any = "";
  allImages : string [] = [];
  education : any  = [];



  editProfile(){
    this.route.navigate([`/editProfile/${this.userInfo.id}`])
  }


  getImageAsBlob(name : string):Observable<Blob>{
    return this.http.get(`${this.baseUrl}${name}`, { responseType: 'blob' });
   }

  convertBlobToBase64(image : Blob, index : number){
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.addEventListener("load", () => {
      // convert image file to base64 string
      this.experienceList[index].image = reader.result;
    }, false);
  }

  addImageToEachExperince(){
    for(let i=0;i<this.experienceList.length;i++){
      const background = this.experienceList[i];
      this.getImageAsBlob(`${background.company}.com`).subscribe(
        (val)=>{
          this.convertBlobToBase64(val,i);
        },
        (err)=> {console.log(err)}
      )
    }
  }


  checkIfEditBtnShouldDisplay(){
    const myUserId = this.access.getLocalStorage();
    if (myUserId && myUserId.id == this.userInfo.id) this.displayEditBtn = true;
    else this.displayEditBtn = false;
  }



  checkIfFollowBtnShouldDisplay(){
    const myUserId = this.access.getLocalStorage();
    if (myUserId && myUserId.id == this.userInfo.id) this.displayFollowBtn = false;
    else this.displayFollowBtn = true;
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];
    this.profileService.getUserById(id).subscribe(
      (val)=>{
        this.userInfo = val; 
        this.experienceList = val.experiences;
        this.checkIfFollowBtnShouldDisplay();
        this.checkIfEditBtnShouldDisplay();
        this.addImageToEachExperince();
      }
    )
   
    
  }

}
