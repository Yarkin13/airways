import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

const canActivate: CanActivateFn = () => inject(AuthService).canActivate();

export default canActivate;
