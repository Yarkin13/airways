import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderDataActions } from 'src/app/redux/actions/header-data.actions';
import { selectHeaderCurrency } from 'src/app/redux/selectors/header-data.selectors';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CurrencySelectorComponent {
  @Input() isMainPage!: boolean;

  currencySelected$;

  constructor(private store: Store) {
    this.currencySelected$ = this.store.select(selectHeaderCurrency);
  }

  handleCurrencyChange(ob: { value: string }) {
    this.store.dispatch(
      HeaderDataActions.setCurrency({ currencyValue: ob.value }),
    );
  }
}
