import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpSpy : jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get','post'])
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: HttpClient, useValue: httpSpy}
      ]
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it(`should test getUserById() method`, ()=>{
    httpSpy.get.and.returnValue(of(true));
    service.getUserById(1);
    expect(httpSpy.get).toHaveBeenCalled();
  });


  it(`should test getProfileByUserId()`, ()=>{
    httpSpy.get.and.returnValue(of(true));
    service.getProfileByUserId(1);
    expect(httpSpy.get).toHaveBeenCalled();
  });

  it(`should test addProfileToUser() method`, ()=>{
    httpSpy.post.and.returnValue(of(true));
    service.addProfileToUser(1,{});
    expect(httpSpy.post).toHaveBeenCalled();
  })


});
