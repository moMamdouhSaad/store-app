// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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
    // Perform basic login validation here
    const username =  this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;

    if (username === 'user' && password === 'user') {

      this.authService.login(username, 'user');
      this.router.navigate(['/user']); // Redirect to user view

    } else if (username === 'admin' && password === 'admin') {
      
      this.authService.login(username, 'admin');
      this.router.navigate(['/admin']); // Redirect to admin view
    } else {
      // Handle invalid credentials
      alert('Invalid username or password');
    }
  }
}
