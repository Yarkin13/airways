import { HttpClient } from '@angular/common/http';
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

  public isErrorLogin$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private modal: ModalService
  ) {}

  private token = '';

  register(userRegData: UserRegisterData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${register}`, userRegData).pipe(
      catchError((err) => {
        throw new Error(err);
      }),
      tap(() => this.authStage$.next(AuthStages.Login))
    );
  }

  login(userCredentials: UserCredential): Observable<UserRegisterData> {
    return this.http.post<{ token: string }>(`${auth}`, userCredentials).pipe(
      catchError((err) => {
        this.isErrorLogin$.next(true);
        throw new Error(err);
      }),
      tap(({ token }) => {
        this.setToken(token);
        this.isErrorLogin$.next(false);
        this.userIsAuth$.next(true);
      }),
      mergeMap(() => this.checkAuthenticated()),
      tap(() => {
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
      this.router.navigate(['./']);
      this.modal.openAuthModal();
      return false;
    }
    console.log('true');
    return true;
  }
}
