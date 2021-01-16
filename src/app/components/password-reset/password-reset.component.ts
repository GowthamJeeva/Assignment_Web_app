import { Component } from '@angular/core';
import { Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { UserService } from './../../services/user.service';
import { MatSnackBar} from '@angular/material';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  private email: any = '';
  private token: String = '';
  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router) {
      this.route.params.subscribe(params =>  {
        this.email = params['mail'];
        this.token = params['token'];
      });
      if (this.email === '') {
        this.openSnackBar('Try reseting the password again', 'OK');
        this.router.navigate(['/login']);
      }
  }

  forgotPasswordForm = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
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

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const data = {
        'password': this.forgotPasswordForm.value.password,
        'email': atob(this.email)
      };
      this.userService.passwordReset(data, this.token).subscribe((res) => {
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
