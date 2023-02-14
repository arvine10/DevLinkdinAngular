import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDialogBoxComponent } from './comment-dialog-box.component';

describe('CommentDialogBoxComponent', () => {
  let component: CommentDialogBoxComponent;
  let fixture: ComponentFixture<CommentDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentDialogBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
