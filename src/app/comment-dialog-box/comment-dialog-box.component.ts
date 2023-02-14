import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-dialog-box',
  templateUrl: './comment-dialog-box.component.html',
  styleUrls: ['./comment-dialog-box.component.css']
})
export class CommentDialogBoxComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CommentDialogBoxComponent>
  ) { 
    
  }


  closeDialog() {
    this.dialogRef.close('Success');
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
