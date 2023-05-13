import { createActionGroup, props } from '@ngrx/store';
import { PassengerInfo } from 'src/app/shared/models/booking.model';
import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const CartActions = createActionGroup({
  source: 'Cart data',
  events: {
    'Add to cart': props<Trip>(),
    'Remove from cart': props<{ id: Array<string> }>(),
    'Edit cart trip': props<{ id: Array<string>, info: Array<PassengerInfo> }>(),
  },
});
