import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../services/access.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submited : boolean = false;

  constructor(private router : Router, private reg: AccessService) { }

  regForm = new FormGroup({
    userDetails: new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      userName: new FormControl('',[Validators.required, Validators.minLength(5)]),
      password : new FormControl('', [Validators.required, Validators.minLength(8)]),
    }),
    contact : new FormGroup({
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
    
  });


  onSubmit(){
    this.submited = true;
    const user = {...this.regForm.value.userDetails, ...this.regForm.value.contact};
    if (this.regForm.valid)
    this.reg.register(user).subscribe(
      (val)=>{
        this.router.navigate(['/login'])
      },
      (err)=>{console.log(err)}
    )

  }

  ngOnInit(): void {
  }

}
