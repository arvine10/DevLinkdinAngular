import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { AccessService } from '../services/access.service'
import { LikeService } from '../services/like.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentService } from '../services/comment.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentDialogBoxComponent } from '../comment-dialog-box/comment-dialog-box.component';
import { CreateCommentComponent } from '../create-comment/create-comment.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // post = [id,description,userName,profileImage,postImage,NumberOfLikes,bool_isCurrentUserLikeThisPost]

  allPosts : any[] =[];
  allLikedPostIds: any[] =[];
  myUser : any ;

  constructor(private posts: PostsService,
              private access: AccessService,
              private like : LikeService,
              private comment : CommentService,
              public dialog: MatDialog,) { }

  

  getAllPosts(){
    this.posts.getAllPosts().subscribe(
      (val)=>{
        this.allPosts = val;
      }
    );
  }

  getMyLikedPosts(){
    const myUser = this.access.getLocalStorage();
    if (myUser){
      const userId =  myUser.id;
      this.myUser = myUser;
      this.posts.getMyLikedPostsId(userId).subscribe(
        (val)=>{
          this.allLikedPostIds = val
          console.log(this.allLikedPostIds);
          this.markPostsAsLiked(); 
        },        (err)=> {
          console.log("no likes!")
          this.markPostsAsLiked();       
      },
        ()=>{this.markPostsAsLiked(); }
      )
    }
    
  }

  markPostsAsLiked(){
    const totalPostsNumer = this.allPosts.length;
    for(let i=0;i<totalPostsNumer;i++){
      const post = this.allPosts[i];
      if (this.allLikedPostIds.includes(post[0])){
        this.allPosts[i].push(true);
      }
      else {this.allPosts[i].push(false);}
    }
    console.log(this.allPosts);
  }

 
  toggleLike(post: any){
    const likeCount = 5;
    const isLiked = 6;
    console.log(post);
    if (post[isLiked]==false) {
      post[isLiked] = true;
      post[likeCount]+= 1;
      console.log(post[isLiked]);
    }
    else {
      post[isLiked] = false;
      post[likeCount]-=1;
      console.log(post[isLiked]);
    }
  }

  likeBtn(post : any, heart: any){
    if (this.myUser){
      this.like.toggleLike( post[0],this.myUser.id).subscribe(
        ()=>{
        this.toggleLike(post);
        }
      )
    }
  }



  
  getCommentsForSelectedPost(postId : number): Observable<any[]>{
    return this.comment.getCommentsForPost(postId);
  }

  createCommentDialog(post : any){
    if (this.myUser){
        let dialogRef = this.dialog.open(CreateCommentComponent, {
        width: '30em',
        height: 'min(fit-content, 50em)',
        hasBackdrop: true,
        disableClose: true,
        data: post
      });

      dialogRef.afterClosed().subscribe((result) =>{
        console.log("dialog closed!");
      })
    }
   
  }


  openDialogBox(comments : any){
    let dialogRef = this.dialog.open(CommentDialogBoxComponent, {
      width: '30em',
      height: 'min(fit-content, 50em)',
      hasBackdrop: true,
      disableClose: true,
      data: comments
    });

    dialogRef.afterClosed().subscribe((result) =>{
      console.log("dialog closed!");
    })
  }


  openCommentDialogeBox(post : any){
    const postId = post[0];
    this.getCommentsForSelectedPost(postId).subscribe(
      (com)=>{
        this.openDialogBox(com);
      }
    )
  }


  ngOnInit(): void {
    this.getAllPosts();
    this.getMyLikedPosts();
    
  }

}
