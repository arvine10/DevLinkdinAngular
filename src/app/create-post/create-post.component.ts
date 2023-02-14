import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { AccessService } from '../services/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private postService : PostsService,
              private access : AccessService,
              private router: Router) { }

  currentInput : any;
  imgSrc : any;

  postForm =  new FormGroup({
    desc : new FormControl('', [Validators.required, Validators.maxLength(1)])
  });

  onFileSelected(event : any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      // convert image file to base64 string
      this.imgSrc = reader.result;
      console.log(this.imgSrc);
    }, false);
  
  }



  async submitPost(){
    const description = this.postForm.controls.desc.value;
    if (description && description.length>0){
      let myPost: any = {};
      myPost['description'] = description;
      // if (this.imgSrc){
      //    const blob = await this.convertBase64ToBlob(this.imgSrc);
      //    myPost['image'] = blob;
      // }
      const myUser = this.access.getLocalStorage();
      this.postService.createPost(myPost,myUser.id).subscribe(
        (val)=>{this.router.navigate(['/'])}
      )

    }
   
   
  }


 async convertBase64ToBlob(img : any){
    const base64 = await fetch(img);
    const blob = await base64.blob();
    return blob;
    
  }

  ngOnInit(): void {
    
  }

}
