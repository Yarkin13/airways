import { createActionGroup, props } from '@ngrx/store';
import { Trip } from 'src/app/shared/models/shopping-cart.model';

export const UserActions = createActionGroup({
  source: 'User data',
  events: {
    'Add to orders': props<{ orders: Array<Trip> }>(),
  },
});
