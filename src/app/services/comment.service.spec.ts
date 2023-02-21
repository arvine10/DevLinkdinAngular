import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('CommentService', () => {
  let service: CommentService;
  let httpSpy : jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
      providers : [
        {provide : HttpClient, useValue: httpSpy}
      ]
    });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it(`should test getCommentsForPost() method`, ()=>{
    httpSpy.get.and.returnValue(of(true));
    service.getCommentsForPost(1);
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it(`should test addCommentForPost() method`, ()=>{
    httpSpy.post.and.returnValue(of(true));
    service.addCommentForPost(1,1, "comment 1");
    expect(httpSpy.post).toHaveBeenCalled();
  })


});
