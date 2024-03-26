import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpClient : HttpClient) { }

  login(credentials: LoginRequest):Observable<Users>{
    return this.httpClient.get<Users>('https://gorest.co.i/public/v2/users/6805291')
    .pipe(
      catchError(this.handleError)
    );

  }
  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('An error occurred:', error.error);
    }else{
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
