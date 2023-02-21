import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  loginData() {
    this.http.get<any>('http://localhost:3000/signup').subscribe(
      (res: any) => {
        const user = Object.values(res).filter(
          (a: any) =>
            a.email === this.loginForm.value.username &&
            a.password === this.loginForm.value.password
        );
        if (user) {
          alert('Login Successfull');
          this.loginForm.reset();
          this.router.navigate(['employee-dashboard']);
        } else {
          alert('User not found please check');
        }
      },
      (err) => {
        alert('Something went wrong let me check it once...!');
      }
    );
  }
}
