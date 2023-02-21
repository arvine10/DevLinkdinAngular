import { TestBed } from '@angular/core/testing';

import { AccessService } from './access.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';



describe('AccessService', () => {
  let httpSyp : jasmine.SpyObj<HttpClient>;
  let service: AccessService;
  let localStore : any;
  let getItem : any;
  let setItem : any;
  let clear : any;
  let removeItem: any;

  beforeEach(() => {
    // place before testbed
    httpSyp = jasmine.createSpyObj('HttpClient', ['get','post']);
    localStore = {};
    TestBed.configureTestingModule({
      imports : [HttpClientModule],
      providers: [
        {provide : HttpClient, useValue : httpSyp}
      ]
    });


   setItem = spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    clear = spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));

    removeItem = spyOn(window.localStorage, 'removeItem').and.callFake(() => (localStore = {}));
    
    service = TestBed.inject(AccessService);
    



  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it(`should test the register method`, ()=>{
    // Arrange
    httpSyp.post.and.returnValue(of(true));
    // Act
    service.register({name : "arvine"});
    // Assert
    expect(httpSyp.post).toHaveBeenCalled();
  });


  it(`should test the login method`, ()=>{
    httpSyp.get.and.returnValue(of(true));
    service.login("arvine@uab.edu", "password");
    expect(httpSyp.get).toHaveBeenCalled();
  });


  it(`should test set localstorage method`, ()=>{
    service.setLocalStorage({});
    expect(setItem).toHaveBeenCalled();
  })


  it(`should test removeLocalStorage() method`, ()=>{
    service.removeLocalStorage();
    expect(removeItem).toHaveBeenCalled();
  })


  it(`should test getLocalStorage() if something exist in localstorage`, ()=>{
    const val = spyOn(window.localStorage, 'getItem').and.returnValue("true");
    let returnVal = service.getLocalStorage();
    expect(returnVal).not.toBeNull();
  })

  it(`should test getLocalStorage() if nothing in local storage`, ()=>{
    const nullVal = spyOn(window.localStorage, 'getItem').and.returnValue(null);
    const returnVal = service.getLocalStorage();
    expect(returnVal).toBeNull();
  })






});
