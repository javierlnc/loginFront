import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private httpClient: HttpClient) { }

  login(credentials: LoginRequest): Observable<Users> {
    return this.httpClient.get<Users>('https://gorest.co.in/public/v2/users/2139332')
      .pipe(
        tap((userData: Users) => { this.currentUserLoginOn.next(true) }),
        catchError(this.handleError)
      );


  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
