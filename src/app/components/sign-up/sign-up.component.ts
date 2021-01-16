import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, ValidatorFn} from '@angular/forms';
import { UserService } from './../../services/user.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private fb: FormBuilder, private userService: UserService,
    private snackBar: MatSnackBar, private router: Router) { }

  signUpForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    mobile_number: ['', [Validators.required]]
  },
  {
    validator : this.passwordMatchValidator
  }
  );

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.userService.signUp(this.signUpForm.value).subscribe((res) => {
        if (res && res.status) {
          this.openSnackBar(res.message, 'OK');
          this.router.navigate(['/login']);
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
