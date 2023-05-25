import { createAction, props } from '@ngrx/store';
import { IFlightData, ISetFlightProps } from 'src/app/shared/models/flight-data.model';
import { IFlightInfo } from 'src/app/shared/models/flight-info.model';

export const setPassengersInfo = createAction(
  '[Flight selection page] Set flight info',
  props<{ passengers: { adult: number; child: number; infant: number } }>()
);
export const searchFlights = createAction(
  '[Flight selection page] Search flights',
  props<{ flightInfo: ISetFlightProps }>()
);
export const searchFlightsSuccess = createAction(
  '[Flight selection page] Search flights Success',
  props<{ newState: IFlightData }>()
);
export const changeStatus = createAction(
  '[Flight selection page] Change status flights',
  props<{ status: string }>()
);
export const setFlightTo = createAction(
  '[Flight selection page] Set flight to',
  props<{ flight: IFlightInfo }>()
);
export const setFlightBack = createAction(
  '[Flight selection page] Set flight back',
  props<{ flight: IFlightInfo }>()
);
export const deleteFlightTo = createAction('[Flight selection page] Delete flight to');
export const deleteFlightBack = createAction('[Flight selection page] Delete flight back');
export const deleteFlight = createAction('[Flight selection page] Delete flight');
export const resetFlight = createAction('[Flight selection page] Reset flight');
