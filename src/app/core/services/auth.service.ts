import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {
  Observable, BehaviorSubject, tap, catchError, mergeMap
} from 'rxjs';
import { UserCredential, UserRegisterData } from '../models/user.model';
/* eslint-disable-next-line */
import { ModalService } from './modal.service';
import {
  register, auth, checkAuth, AuthStages
} from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authStage$ = new BehaviorSubject<AuthStages>(AuthStages.Login);

  public userIsAuth$ = new BehaviorSubject<boolean>(false);

  public isErrorLoginMessage$ = new BehaviorSubject<string>('');

  public isLoading$ = new BehaviorSubject<boolean>(false);

  public isErrorRegisterMessage$ = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private modal: ModalService
  ) {}

  private token = '';

  register(userRegData: UserRegisterData): Observable<{ token: string }> {
    this.isLoading$.next(true);
    return this.http.post<{ token: string }>(`${register}`, userRegData).pipe(
      catchError((err: HttpErrorResponse) => {
        this.isErrorRegisterMessage$.next(
          err.error.message || 'Something went wrong'
        );
        this.isLoading$.next(false);
        throw new Error(err.error.message);
      }),
      tap(() => {
        this.isErrorRegisterMessage$.next('');
        this.isLoading$.next(false);
        this.authStage$.next(AuthStages.Login);
      })
    );
  }

  login(userCredentials: UserCredential): Observable<UserRegisterData> {
    this.isLoading$.next(true);
    return this.http.post<{ token: string }>(`${auth}`, userCredentials).pipe(
      catchError((err: HttpErrorResponse) => {
        this.isErrorLoginMessage$.next(
          err.error.message || 'Something went wrong'
        );
        this.isLoading$.next(false);
        throw new Error(err.error.message);
      }),
      tap(({ token }) => {
        this.setToken(token);
        this.isErrorLoginMessage$.next('');
        this.userIsAuth$.next(true);
      }),
      mergeMap(() => this.checkAuthenticated()),
      tap(() => {
        this.isLoading$.next(false);
        this.modal.closeAllModal();
      })
    );
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token ? this.token : localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.setToken('');
    this.userIsAuth$.next(false);
  }

  checkAuthenticated() {
    return this.http.get<UserRegisterData>(`${checkAuth}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.logout();
          throw new Error('Token expired');
        }
        throw new Error('Something went wrong');
      }),
      tap(() => {
        this.userIsAuth$.next(true);
      })
    );
  }

  checkExpiredToken() {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  canActivate() {
    if (!this.checkExpiredToken()) {
      this.modal.openAuthModal();
      return false;
    }
    return true;
  }
}
