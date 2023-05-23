import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CURRENCY_EXCHANGE } from 'src/app/shared/constants/currency';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { selectHeaderCurrency } from './header-data.selectors';

const selectBookingData = createFeatureSelector<Trip>('bookingData');

const selectPassengersType = createSelector(selectBookingData, (state: Trip) => state.passengers);

const selectFlightPrice = createSelector(selectBookingData, (state: Trip) => state.flight.price);

const selectFlightSeatOneWay = createSelector(
  selectBookingData,
  (state: Trip) => state.flight.oneWay.seats
);

const selectPassengersInfo = createSelector(
  selectBookingData,
  selectFlightSeatOneWay,
  (state: Trip, seatsOneWay) => {
    // Generate seat logic
    const seatsReturnWay = state.flight.returnWay ? state.flight.returnWay.seats : undefined;
    const getSeatArray = (totalSeats: number, passengersCount: number) => {
      const maxRows = totalSeats / 6;
      let randomRow = Math.floor(Math.random() * maxRows - 1) + 1;
      const seatsArray = ['A', 'B', 'C', 'D', 'E', 'F'];
      const resultSeatArr: Array<string> = [];
      let letterInd = Math.floor(Math.random() * 5);

      for (let i = 1; i <= passengersCount; i += 1) {
        if (letterInd === 5) {
          letterInd = 0;
          if (randomRow !== maxRows) {
            randomRow += 1;
          } else {
            const oldRandomRow = randomRow;
            do {
              randomRow = Math.floor(Math.random() * maxRows);
            } while (oldRandomRow !== randomRow);
          }
        } else {
          letterInd += 1;
        }

        resultSeatArr.push(randomRow + seatsArray[letterInd]);
      }
      return resultSeatArr;
    };

    const seatArrayOneWay = getSeatArray(seatsOneWay.total, state.passengersInfo.length);
    const seatArrayReturnWay = seatsReturnWay
      ? getSeatArray(seatsReturnWay.total, state.passengersInfo.length)
      : undefined;
    let passengerSeatOneWay;
    let passengerSeatReturnWay;

    return state.passengersInfo.map((passenger, index) => {
      if (passenger.passengerType === 'Infant') {
        passengerSeatOneWay = undefined;
        passengerSeatReturnWay = undefined;
      } else {
        passengerSeatOneWay = seatArrayOneWay[index];
        passengerSeatReturnWay = seatArrayReturnWay ? seatArrayReturnWay[index] : undefined;
      }

      return {
        ...passenger,
        seat: {
          oneWay: passengerSeatOneWay,
          returnWay: passengerSeatReturnWay,
        },
      };
    });
  }
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
      farePrice = +price * 0.6451362170144961;
      chargePrice = +price * 0.3548637829855039;
    } else if (passenger.type === 'Child') {
      farePrice = +price * 0.4119544518285337;
      chargePrice = +price * 0.3500835567991916;
    } else {
      farePrice = +price * 0.3419999222727449;
      chargePrice = +price * 0.03886362753099374;
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
    fare: (+passenger.fare * CURRENCY_EXCHANGE[currency]).toFixed(2).toString(),
    charge: (+passenger.charge * CURRENCY_EXCHANGE[currency]).toFixed(2).toString(),
  }))
);

const selectCurTripCost = createSelector(
  selectPassengersFareByType,
  (passengersType) => passengersType
    .reduce((acc, cur) => acc + Number(+cur.fare + +cur.charge) * cur.count, 0)
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
  selectPassengersInfo,
  selectCurTripCost,
  (data, passengersFare, info, cost) => ({
    ...data,
    passengers: passengersFare,
    passengersInfo: info,
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
