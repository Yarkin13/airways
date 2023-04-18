import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderDataActions } from 'src/app/redux/actions/header-data.actions';
import { selectHeaderDate } from 'src/app/redux/selectors/header-data.selectors';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DateSelectorComponent {
  @Input() isMainPage!: boolean;

  dateSelected$;

  constructor(private store: Store) {
    this.dateSelected$ = this.store.select(selectHeaderDate);
  }

  handleDateChange({ value }: { value: string }) {
    this.store.dispatch(HeaderDataActions.setDate({ dateValue: value }));
  }
}
