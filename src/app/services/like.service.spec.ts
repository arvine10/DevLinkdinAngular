import { TestBed } from '@angular/core/testing';

import { LikeService } from './like.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('LikeService', () => {
  let service: LikeService;
  let httpSpy : jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: HttpClient, useValue : httpSpy}
      ]
    });
    service = TestBed.inject(LikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it(`should test toggleLike() method`, ()=>{
    httpSpy.post.and.returnValue(of(true));
    service.toggleLike(1,1);
    expect(httpSpy.post).toHaveBeenCalled();
  })

});
