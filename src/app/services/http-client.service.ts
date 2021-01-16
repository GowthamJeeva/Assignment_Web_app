import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CookieStorageService } from './cookie-storage.service';

@Injectable()
export class HttpClientService {

  constructor(
    private http: HttpClient, private cookieService: CookieStorageService
  ) { }

  // HttpClientModule Get method call
  public get(url: string): Observable<HttpResponse<any>> {
      const headers = this.addHeaders();
    return this.http.get(url, {headers,
      observe: 'response'
    }).pipe(
      catchError(
        (error) => this.handleError(error)
    ));
  }

  handleError(error: any): Observable<any> {
    return null;
  }

  // HttpClientModule Post method call
  post(url, postBody: any, token = ''): Observable<any> {
    const headers = this.addHeaders(token);
    return this.http.post(url, postBody, {headers}).pipe(
      catchError((error) => this.handleError(error)));
  }

  // HttpClientModule Put method call
  public put(url: string, data: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(url, data, {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      }),
      observe: 'response'
    }).pipe(catchError((error) => this.handleError(error)));
  }

  // HttpClientModule Delete method call
  public delete(url: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(url, {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      }),
      observe: 'response'
    }).pipe(catchError((error) => this.handleError(error)));
  }

  private addHeaders(token = '') {
    const authToken = this.cookieService.getCookie('authToken') || '';
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization': token === '' ? authToken : token
    });
    return headers;
  }
}
