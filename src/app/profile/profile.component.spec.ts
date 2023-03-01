import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { AccessService } from '../services/access.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileServiceSpy : jasmine.SpyObj<ProfileService>
  let accessServiceSpy : jasmine.SpyObj<AccessService>
  let httpSpy : jasmine.SpyObj<HttpClient>
  let routerSpy : jasmine.SpyObj<Router>
  let fakeUser = {id: 1, name:  "arvine", experiences: []};

  beforeEach(async () => {
    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getUserById']);
    accessServiceSpy = jasmine.createSpyObj('AccessService', ['getLocalStorage']);
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      providers: [
        {provide : ActivatedRoute, useValue: {
          snapshot: {
            params: {id : 1}
          }
        }},
        {provide : ProfileService, useValue: profileServiceSpy},
        {provide : AccessService, useValue: accessServiceSpy},
        {provide : HttpClient, useValue: httpSpy},
        {provide : Router, useValue: routerSpy}
      ],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.userInfo = fakeUser;
    fixture.detectChanges();
    await fixture.whenStable()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit(`should test ngOninit() method`, ()=>{
    profileServiceSpy.getUserById.and.returnValue(of(fakeUser));
    component.ngOnInit();
    expect(component.userInfo).toEqual(fakeUser);

  });


});
