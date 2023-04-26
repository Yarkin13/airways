import { createActionGroup, props } from '@ngrx/store';
import { Flight } from 'src/app/shared/models/booked-flights.model';

export const CartActions = createActionGroup({
  source: 'Cart data',
  events: {
    'Add to cart': props<Flight>(),
    // 'Remove from cart': props<{ id: string }>(),
  },
});
