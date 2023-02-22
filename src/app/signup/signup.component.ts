import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      name: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      repeatpassword: new FormControl('',[Validators.required]),
      checkbox : new FormControl('', [Validators.required])
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
