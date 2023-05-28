import { createActionGroup, props } from '@ngrx/store';

export const HeaderDataActions = createActionGroup({
  source: 'Header data',
  events: {
    'Set date': props<{ dateValue: string }>(),
    'Set currency': props<{ currencyValue: string }>(),
  },
});
