import { createActionGroup, props } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const UserOrdersActions = createActionGroup({
  source: 'User orders data',
  events: {
    'Add to orders': props<{ orders: Array<Trip> }>(),
  },
});
