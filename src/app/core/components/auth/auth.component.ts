import { Component } from '@angular/core';
/* eslint-disable-next-line */
import { AuthService } from '../../services/auth.service';
import { AuthStages } from '../../../shared/constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(public auth: AuthService) {}

  onChangeTabs(value: AuthStages) {
    this.auth.authStage$.next(value);
  }
}
