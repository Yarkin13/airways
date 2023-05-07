import { createReducer, on } from '@ngrx/store';
import { UserRegisterData } from '../../core/models/user.model';
import { addUserData, removeUser } from '../actions/user-data.actions';

export const initialState: UserRegisterData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  countryCode: '',
  phone: '',
  citizenship: '',
  gender: '',
};

export const userReducer = createReducer(
  initialState,
  /* eslint-disable-next-line */
  on(addUserData, (state, data) => ({ ...state, ...data })),
  /* eslint-disable-next-line */
  on(removeUser, (state) => ({ ...state, ...initialState }))
);
