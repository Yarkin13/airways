import { createActionGroup, props } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const CartActions = createActionGroup({
  source: 'Cart data',
  events: {
    'Add to cart': props<Trip>(),
    // 'Remove from cart': props<{ id: string }>(),
  },
});
