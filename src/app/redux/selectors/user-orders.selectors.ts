import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrencyExchange } from 'src/app/shared/models/shopping-cart.model';
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
    totalCost: (+order.totalCost * order.currencyExchange[currency as keyof CurrencyExchange])
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
          fare: passenger.fare
          && (+passenger.fare * order.currencyExchange[currency as keyof CurrencyExchange])
            .toFixed(2)
            .toString(),
          charge: passenger.charge
          && (+passenger.charge * order.currencyExchange[currency as keyof CurrencyExchange])
            .toFixed(2)
            .toString(),
        })),
        totalCost: (+order.totalCost * order.currencyExchange[currency as keyof CurrencyExchange])
          .toFixed(2)
          .toString(),
      });
    }
    return undefined;
  }
);
