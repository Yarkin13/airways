import {
  Component, Input, OnInit, ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHeaderCurrency } from 'src/app/redux/selectors/header-data.selectors';
import { IFlightInfo } from 'src/app/shared/models/flight-info.model';

@Component({
  selector: 'dates-slider',
  templateUrl: './dates-slider.component.html',
  styleUrls: ['./dates-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatesSliderComponent implements OnInit {
  @Input() dates!: IFlightInfo[];
  @Input() back!: boolean;

  currency!: string;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    console.log(this.dates);

    // eslint-disable-next-line @ngrx/no-store-subscription
    this.store.select(selectHeaderCurrency).subscribe((cur) => {
      this.currency = cur;
    });
  }
}
