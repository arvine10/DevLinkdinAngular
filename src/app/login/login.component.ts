import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../services/access.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private login: AccessService) { }
  loginError = false;

  profileForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });


  onSubmit(){
    const email = this.profileForm.value.email;
    const password = this.profileForm.value.password;
    if (email && password)
    this.login.login(email,password).subscribe(
      (val)=>{
        this.login.setLocalStorage(val);
        this.login.isLogged.next(true);
        this.router.navigate(['/']);
      },
      (err)=> {this.loginError = true}
    )
    
  }

  ngOnInit(): void {
  }

}
