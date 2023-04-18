import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator, passwordValidator } from '../../../validators';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
})
export class LogInFormComponent {
  hidePassword = true;

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
      /* eslint-disable-next-line */
      ? "Your password isn't strong enough"
      : '';
  }

  onSubmit() {
    this.authForm.markAllAsTouched();
    if (this.authForm.invalid) return;

    console.log(this.authForm.value);
  }
}
