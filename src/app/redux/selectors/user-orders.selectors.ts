import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CURRENCY_EXCHANGE } from 'src/app/shared/constants/currency';
import { UserOrdersData } from '../state.models';
import { selectHeaderCurrency } from './header-data.selectors';

const selectUserData = createFeatureSelector<UserOrdersData>('userOrdersData');

export const selectUserOrdersData = createSelector(
  selectUserData,
  (state: UserOrdersData) => state.orders,
);

export const selectUserOrdersInCur = createSelector(
  selectUserOrdersData,
  selectHeaderCurrency,
  (orders, currency) => orders.map((order) => ({
    ...order,
    totalCost: (+order.totalCost * CURRENCY_EXCHANGE[currency])
      .toFixed(2)
      .toString(),
  })),
);

export const selectOrderById = (id: string) => createSelector(
  selectUserOrdersData,
  (orders) => {
    if (orders) {
      return orders.find((trip) => trip.id === id);
    }
    return undefined;
  }
);

export const selectOrderByIdInCur = (id: string) => createSelector(
  selectOrderById(id),
  selectHeaderCurrency,
  (order, currency) => {
    if (order) {
      return ({
        ...order,
        passengers: order.passengers.map((passenger) => ({
          ...passenger,
          fare: passenger.fare && (+passenger.fare * CURRENCY_EXCHANGE[currency])
            .toFixed(2)
            .toString(),
          charge: passenger.charge && (+passenger.charge * CURRENCY_EXCHANGE[currency])
            .toFixed(2)
            .toString(),
        })),
        totalCost: (+order.totalCost * CURRENCY_EXCHANGE[currency])
          .toFixed(2)
          .toString(),
      });
    }
    return undefined;
  }
);
