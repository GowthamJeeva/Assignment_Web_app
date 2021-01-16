import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    productList = [];
    constructor(private userService: UserService, private router: Router) { }
    ngOnInit() {
        this.productList = this.userService.cartItems;
        if (this.productList.length === 0) {
            alert('No items to show. Redirecting to Dashboard');
            this.router.navigate(['/dashboard']);
        }
    }
}
