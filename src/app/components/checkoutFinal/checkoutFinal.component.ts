import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, ValidatorFn} from '@angular/forms';
import { UserService } from './../../services/user.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout-final',
    templateUrl: './checkoutFinal.component.html',
    styleUrls: ['./checkoutFinal.component.css']
})
export class CheckoutFinalComponent implements OnInit {
    constructor(private fb: FormBuilder, private userService: UserService,
        private snackBar: MatSnackBar, private router: Router) { }
        checkoutForm = this.fb.group({
            name: ['', Validators.required],
            deliveryAddress: ['', Validators.required],
            mobile_number: ['', [Validators.required]]
          });
          productList = [];
    ngOnInit() {
        this.productList = this.userService.cartItems;
        if (this.productList.length === 0) {
            alert('No items to show. Redirecting to Dashboard');
            this.router.navigate(['/dashboard']);
        }
    }

    submitOrder() {
        const arr = [];
        this.userService.cartItems.forEach(d => {
            const obj = {
                product_name: d.name,
                product_uuid: d.id,
                sku: d.sku,
                user_name: this.checkoutForm.get('name').value,
                phone_number: this.checkoutForm.get('mobile_number').value,
                delivery_address: this.checkoutForm.get('deliveryAddress').value
            };
            arr.push(obj);
        });
        this.userService.submitOrder(arr).subscribe(res => {
            alert('Order Submitted successfully');
            this.router.navigate(['/dashboard']);
        });
    }
}
