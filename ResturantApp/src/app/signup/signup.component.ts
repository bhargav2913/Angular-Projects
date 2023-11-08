import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  constructor(private formBuider :FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuider.group({
      name:[''],
      email:[''],
      mobile:[''],
      password:[''],
    })
  }

  signUp(){
     this._http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(res=>{
      alert("Sign Up Successfully");
      this.signupForm.reset();
      this.router.navigate(['login'])
     },err=>{
      alert("Sign Up Failure");
     })
  }
}
