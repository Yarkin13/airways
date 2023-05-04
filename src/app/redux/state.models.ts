import { Trip } from '../shared/models/shopping-cart.model';

export interface State {
  headerData: HeaderData;
  bookingData: Trip;
  cart: Array<Trip>;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}
