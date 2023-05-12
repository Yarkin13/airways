import { UserRegisterData } from '../core/models/user.model';
import { Trip } from '../shared/models/shopping-cart.model';

export interface State {
  headerData: HeaderData;
  bookingData: Trip;
  cart: Array<Trip>;
  user?: UserRegisterData;
  userOrders: UserOrdersData;
}

export interface HeaderData {
  dateValue: string;
  currencyValue: string;
}

export interface UserOrdersData {
  orders: Array<Trip>;
}
