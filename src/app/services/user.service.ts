import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { environment } from './../../environments/environment';
@Injectable()
export class UserService {
    private API_ENDPOINT = environment.API_ENDPOINT;
    constructor(private httpService: HttpClientService) { }

    cartItems = [];
    setCartItems(product) {
        this.cartItems.push(product);
    }
    login(data) {
        data.email = data.email.toLowerCase();
        const url = this.API_ENDPOINT + 'login';
        return this.httpService.post(url, {data});
    }

    signUp(data) {
        data.email = data.email.toLowerCase();
        const url = this.API_ENDPOINT + 'sign-up';
        return this.httpService.post(url, {data});
    }

    forgotPassword(data) {
        data.email = data.email.toLowerCase();
        const url = this.API_ENDPOINT + 'forgot-password';
        return this.httpService.post(url, {data});
    }

    passwordReset(data, token) {
        const url = this.API_ENDPOINT + 'password-reset';
        return this.httpService.post(url, {data}, token);
    }

    getProductList(data) {
        const url = this.API_ENDPOINT + 'product-list';
        return this.httpService.post(url, data);
    }

    submitOrder(data) {
        const url = this.API_ENDPOINT + 'order';
        return this.httpService.post(url, {cartItems: data});
    }
}
