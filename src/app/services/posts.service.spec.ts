import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PostsService', () => {
  let service: PostsService;
  let httpSpy : jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide : HttpClient, useValue: httpSpy}
      ]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it(`should test getAllPosts()`, ()=>{
    httpSpy.get.and.returnValue(of(true));
    service.getAllPosts();
    expect(httpSpy.get).toHaveBeenCalled();
  });


  it(`should test getMyLikedPostsId() method`, ()=>{
    httpSpy.get.and.returnValue(of(true));
    service.getMyLikedPostsId(1);
    expect(httpSpy.get).toHaveBeenCalled();
  });


  it(`should test createPost() method`, ()=>{
    httpSpy.post.and.returnValue(of(true));
    service.createPost({},1);
    expect(httpSpy.post).toHaveBeenCalled();
  })




});
