import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { AccessService } from '../services/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private login: AccessService, private router : Router) { }

  status: boolean = true;

  ngOnInit(): void {
    const token = this.login.getLocalStorage();
    if (token) this.login.isLogged.next(true);
    this.login.isLogged.subscribe(
      (val)=> {this.status = val}
    );    
  }


  logout(){
    this.login.removeLocalStorage();
    this.router.navigate(['/']);
  }


  goToProfile(){
    const user = this.login.getLocalStorage();
    this.router.navigate([`profile/${user.id}`])
  }

}
