import { Component, OnInit } from '@angular/core';
import { CookieStorageService } from './../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(private cookieService: CookieStorageService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.cookieService.clearCookie('authToken');
    this.router.navigate(['/login']);
  }

}
