import { createReducer, on } from '@ngrx/store';
import { HeaderDataActions } from '../actions/header-data.actions';
import { HeaderData } from '../state.models';

export const initialState = {
  dateValue: 'MM/DD/YYYY',
  currencyValue: 'EUR',
};

export const headerDataReducer = createReducer(
  initialState,
  on(
    HeaderDataActions.setDate,
    (state, { dateValue }): HeaderData => ({ ...state, dateValue }),
  ),
  on(
    HeaderDataActions.setCurrency,
    (state, { currencyValue }): HeaderData => ({ ...state, currencyValue }),
  ),
);
