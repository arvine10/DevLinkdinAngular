import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccessService } from '../services/access.service';
import { CommentService } from '../services/comment.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CreateCommentComponent>,
  private access : AccessService,
  private comment : CommentService) { }
  isSubmit : boolean = false;

  form = new FormGroup({
    description : new FormControl('', [Validators.required, Validators.maxLength(1)])
  })



  close(){
    this.dialogRef.close();
  }

  submitComment(){
    this.isSubmit = true;
    const description = this.form.controls.description.value;
    if (description && description?.length != 0 ){
      const user = this.access.getLocalStorage();
      const postId = this.data[0];
      const descObj = {description : description};
      this.comment.addCommentForPost(user.id,postId,descObj).subscribe(
        ()=>{
          this.close();
        })
    }
  }

  ngOnInit(): void {

  }

}
