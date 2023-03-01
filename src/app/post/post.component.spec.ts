import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostsService } from '../services/posts.service';
import { AccessService } from '../services/access.service';
import { LikeService } from '../services/like.service';
import { CommentService } from '../services/comment.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postServiceSpy : jasmine.SpyObj<PostsService>;
  let accessServiceSpy : jasmine.SpyObj<AccessService>;
  let likeServiceSpy : jasmine.SpyObj<LikeService>;
  let commentServiceSpy : jasmine.SpyObj<CommentService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [ PostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
