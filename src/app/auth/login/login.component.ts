// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error!:string;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.error = '';
    const username =  this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    if (username === 'user' && password === 'user') {

      this.authService.login(username, 'user');
      this.router.navigate(['/products/user']); // Redirect to user view

    } else if (username === 'admin' && password === 'admin') {
      
      this.authService.login(username, 'admin');
      this.router.navigate(['/products/admin']); // Redirect to admin view
    } else {
      // Handle invalid credentials
      this.error = 'Username or password invalid'
    }
  }
}
