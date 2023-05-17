import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CURRENCY_EXCHANGE } from 'src/app/shared/constants/currency';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { selectHeaderCurrency } from './header-data.selectors';

const selectBookingData = createFeatureSelector<Trip>('bookingData');

const selectPassengersType = createSelector(
  selectBookingData,
  (state: Trip) => state.passengers
);

const selectFlightPrice = createSelector(
  selectBookingData,
  (state: Trip) => state.flight.price
);

const selectPassengersInfo = createSelector(
  selectBookingData,
  (state: Trip) => state.passengersInfo
);

export const selectContactDetails = createSelector(
  selectBookingData,
  (state: Trip) => state.contactDetails
);

/* eslint-disable-next-line */
export const selectPassengerById = (id: string) => createSelector(selectPassengersInfo, (passengersInfo) => passengersInfo.find((item) => item.id === id));

const selectPassengersFareByType = createSelector(
  selectPassengersType,
  selectFlightPrice,
  (passengersType, price) => passengersType.map((passenger) => {
    let farePrice;
    let chargePrice;
    if (passenger.type === 'Adult') {
      farePrice = +price;
      chargePrice = +price * 0.55;
    } else if (passenger.type === 'Child') {
      farePrice = +price * 0.6386;
      chargePrice = +price * 0.5427;
    } else {
      farePrice = +price * 0.53;
      chargePrice = +price * 0.0602;
    }
    return {
      ...passenger,
      fare: farePrice.toFixed(2).toString(),
      charge: chargePrice.toFixed(2).toString(),
    };
  })
);

const selectPassengersFareByTypeInCur = createSelector(
  selectPassengersFareByType,
  selectHeaderCurrency,
  (passengersType, currency) => passengersType.map((passenger) => ({
    ...passenger,
    fare: (+passenger.fare * CURRENCY_EXCHANGE[currency])
      .toFixed(2)
      .toString(),
    charge: (+passenger.charge * CURRENCY_EXCHANGE[currency])
      .toFixed(2)
      .toString(),
  }))
);

const selectCurTripCost = createSelector(
  selectPassengersFareByType,
  (passengersType) => passengersType
    .reduce((acc, cur) => acc + Number(+cur.fare + +cur.charge), 0)
    .toFixed(2)
    .toString()
);

const selectCurTripCostInCur = createSelector(
  selectCurTripCost,
  selectHeaderCurrency,
  (cost, currency) => (+cost * CURRENCY_EXCHANGE[currency]).toFixed(2).toString()
);

export const selectBookingTrip = createSelector(
  selectBookingData,
  selectPassengersFareByType,
  selectCurTripCost,
  (data, passengersFare, cost) => ({
    ...data,
    passengers: passengersFare,
    totalCost: cost,
  })
);

export const selectBookingTripInCur = createSelector(
  selectBookingData,
  selectPassengersFareByTypeInCur,
  selectCurTripCostInCur,
  (data, passengersFare, cost) => ({
    ...data,
    passengers: passengersFare,
    totalCost: cost,
  })
);
