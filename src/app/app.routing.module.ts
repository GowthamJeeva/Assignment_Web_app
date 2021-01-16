import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutFinalComponent } from './components/checkoutFinal/checkoutFinal.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutComponent
    },
    {
        path: 'checkoutFinal',
        canActivate: [AuthGuard],
        component: CheckoutFinalComponent
    },
    {
        path: 'password-reset/:mail/:token',
        component: PasswordResetComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash : true})],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
