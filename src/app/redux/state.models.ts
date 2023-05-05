import { Trip } from '../shared/models/shopping-cart.model';

export interface State {
  headerData: HeaderData;
  bookingData: Trip;
  cart: Array<Trip>;
  user: UserData;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}

export interface UserData {
  orders: Array<Trip>;
}
