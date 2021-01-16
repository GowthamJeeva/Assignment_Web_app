import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatTableModule,
   MatPaginatorModule, MatCardModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientService, UserService, CookieStorageService} from './services';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutFinalComponent } from './components/checkoutFinal/checkoutFinal.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    DashboardComponent,
    PasswordResetComponent,
    AppHeaderComponent,
    CheckoutComponent,
    CheckoutFinalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatTableModule, MatPaginatorModule
  ],
  providers: [
    HttpClientService, UserService, CookieStorageService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
