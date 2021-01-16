import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
@Injectable()
export class CookieStorageService {

    getCookie(property) {
      const cookiePrefix = environment.COOKIE_PREFIX;
      const name = `${cookiePrefix}${property}` + '=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }

    checkCookieAvailability(value) {
      const data = this.getCookie(value);
      if (data !== '') {
        return true;
      } else {
        return false;
      }
    }

    clearCookie(value) {
      const domainName = environment.COOKIE_DOMAIN_NAME;
      const cookiePrefix = environment.COOKIE_PREFIX;
      const expires = new Date().toUTCString();
      document.cookie = `${cookiePrefix}${value}=; expires=${expires}`;
    }

    setCookie(name, value) {
      const domainName = environment.COOKIE_DOMAIN_NAME;
      const cookiePrefix = environment.COOKIE_PREFIX;
      const date = new Date();
      date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
      const expires = date.toUTCString();
      // document.cookie = `${cookiePrefix}${name}=${value};domain=${domainName};expires=${expires}`;
      document.cookie = `${cookiePrefix}${name}=${value};expires=${expires}`;

    }

}
