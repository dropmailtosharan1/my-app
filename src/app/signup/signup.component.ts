import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  signupUser:any;

  constructor( private http:HttpClient, private router:Router ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      repeatpassword: new FormControl(),
    });
  }

  signupData() {
    this.http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe(res=>{
       alert('Signup Successfull');
       this.signupForm.reset();
       this.router.navigate(['/login']);
    },
    err=>{
      alert('Something went wrong let me check it once...!');
    })
  }
}
