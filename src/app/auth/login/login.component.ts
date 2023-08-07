// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from 'src/app/enums/User.credentials.enum';
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
    

    if (username == UserCredential.USER && password == UserCredential.USER) {

      this.authService.login(username,UserCredential.USER);
      this.router.navigate(['/products']); // Redirect to user view

    } else if (username === UserCredential.ADMIN && password === UserCredential.ADMIN) {
              
      this.authService.login(username, UserCredential.ADMIN);
      this.router.navigate(['/products/admin']); // Redirect to admin view

    } else {
      // Handle invalid credentials
      this.error = 'Username or password invalid'
    }
  }
}
