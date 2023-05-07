import { createAction, props } from '@ngrx/store';
import { UserRegisterData } from '../../core/models/user.model';

export const addUserData = createAction(
  '[User data] add user data',
  /* eslint-disable-next-line */
  props<UserRegisterData>()
);

export const removeUser = createAction('[User data] remove user dat');
