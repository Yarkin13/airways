import { Trip } from '../shared/models/shopping-cart.model';

export interface State {
  headerData: HeaderData;
  bookingData: Trip;
  cart: Array<Trip>;
  userOrders: UserOrdersData;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}

export interface UserOrdersData {
  orders: Array<Trip>;
}
