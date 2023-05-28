import { Store } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  emailValidator,
  passwordValidator,
} from '../../../../shared/validators';
import { addUserData } from '../../../../redux/actions/user-data.actions';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
})
export class LogInFormComponent implements OnDestroy {
  hidePassword = true;

  loginSub: Subscription;

  constructor(public auth: AuthService, private readonly store: Store) {}

  authForm = new FormGroup({
    login: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', [Validators.required, passwordValidator()]),
  });

  get login() {
    return this.authForm.get('login');
  }

  get password() {
    return this.authForm.get('password');
  }

  getErrorMessageLogin() {
    if (this.login?.hasError('required')) {
      return 'Please enter a login email';
    }

    return this.login?.hasError('emailValidator') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.password?.hasError('required')) {
      return 'Please enter a password';
    }

    return this.password?.hasError('passwordValidator')
      ? 'Your password isn`t strong enough'
      : '';
  }

  onSubmit() {
    this.authForm.markAllAsTouched();
    if (this.authForm.invalid) return;

    this.loginSub = this.auth
      .login({
        email: this.login?.value || '',
        password: this.password?.value || '',
      })
      .subscribe((data) => this.store.dispatch(addUserData(data)));
  }

  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }
}
