import { Component } from '@angular/core';
import { Validators, FormBuilder} from '@angular/forms';
import { UserService } from './../../services/user.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { CookieStorageService } from './../../services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private userService: UserService,
    private snackBar: MatSnackBar, private router: Router, private cookieService: CookieStorageService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe((res) => {
        if (res && res.status) {
          this.openSnackBar(res.message, 'OK');
          this.cookieService.setCookie('authToken', res.authToken);
          this.router.navigate(['/dashboard']);
        } else if (res && res.status === false) {
          this.openSnackBar(res.message, 'OK');
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
