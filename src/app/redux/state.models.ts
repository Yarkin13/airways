import { UserRegisterData } from '../core/models/user.model';
import { Trip } from '../shared/models/shopping-cart.model';

export interface State {
  headerData: HeaderData;
  bookingData: Trip;
  cart: Array<Trip>;
  user?: UserRegisterData;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}
