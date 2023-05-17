import { createReducer, on } from '@ngrx/store';
import { IFlightData } from 'src/app/shared/models/flight-data.model';
import {
  deleteFlight,
  deleteFlightBack,
  deleteFlightTo,
  setFlightBack,
  setFlightInfo,
  setFlightTo,
} from '../actions/flight.action';

export const initialState: IFlightData = {
  from: '',
  to: '',
  type: '',
  dateTo: '',
  dateBack: null,
  passengers: [],
  flightTo: null,
  flightBack: null,
};

export const flightReducer = createReducer(
  initialState,
  on(
    setFlightInfo,
    (_, { flightInfo }): IFlightData => ({
      flightTo: null,
      flightBack: null,
      ...flightInfo,
    })
  ),
  on(setFlightTo, (state, { flight }): IFlightData => ({ ...state, flightTo: flight })),
  on(setFlightBack, (state, { flight }): IFlightData => ({ ...state, flightBack: flight })),
  on(deleteFlightTo, (state): IFlightData => ({ ...state, flightTo: null })),
  on(deleteFlightBack, (state): IFlightData => ({ ...state, flightBack: null })),
  on(deleteFlight, (): IFlightData => ({ ...initialState }))
);
