import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieStorageService } from './../services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private cookieService: CookieStorageService, private router: Router) {}
    canActivate(): boolean {
        const authToken = this.cookieService.getCookie('authToken') || null;
        if (!authToken) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
    }
}
