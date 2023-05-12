import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRegisterData } from 'src/app/core/models/user.model';

const selectUserData = createFeatureSelector<UserRegisterData>('userInfo');

export const selectUserInfo = createSelector(
  selectUserData,
  (state: UserRegisterData) => state
);
