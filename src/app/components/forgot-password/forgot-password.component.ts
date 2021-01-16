import { Component } from '@angular/core';
import { Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { UserService } from './../../services/user.service';
import { MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    console.log(this.route.snapshot.queryParams);
  }

  forgotPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  }
  );

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.userService.forgotPassword(this.forgotPasswordForm.value).subscribe((res) => {
        if (res && res.status) {
          this.openSnackBar(res.message, 'OK');
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
