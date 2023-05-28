import { createReducer, on } from '@ngrx/store';
import { IFlightData } from 'src/app/shared/models/flight-data.model';
import {
  changeStatus,
  deleteFlight,
  deleteFlightBack,
  deleteFlightTo,
  searchFlightsSuccess,
  setFlightBack,
  setFlightTo,
  setPassengersInfo,
  resetFlight,
} from '../actions/flight.action';

export const initialState: IFlightData = {
  status: 'loading',
  from: '',
  to: '',
  fromKey: '',
  toKey: '',
  type: '',
  dateTo: '',
  dateBack: null,
  adult: 0,
  child: 0,
  infant: 0,
  flightTo: null,
  flightBack: null,
  flights: [],
};

export const flightReducer = createReducer(
  initialState,
  on(
    setPassengersInfo,
    (state, { passengers }): IFlightData => ({
      ...state,
      ...passengers,
    })
  ),
  on(
    searchFlightsSuccess,
    (_, { newState }): IFlightData => ({
      ...newState,
    })
  ),
  on(setFlightTo, (state, { flight }): IFlightData => ({ ...state, flightTo: flight })),
  on(changeStatus, (state, { status }): IFlightData => ({ ...state, status })),
  on(setFlightBack, (state, { flight }): IFlightData => ({ ...state, flightBack: flight })),
  on(deleteFlightTo, (state): IFlightData => ({ ...state, flightTo: null })),
  on(deleteFlightBack, (state): IFlightData => ({ ...state, flightBack: null })),
  on(deleteFlight, (state): IFlightData => ({ ...state, flightTo: null, flightBack: null })),
  on(resetFlight, (): IFlightData => ({ ...initialState })),
);
