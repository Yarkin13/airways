import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IEmptyFlight, IFlightInfo } from 'src/app/shared/models/flight-info.model';

@Component({
  selector: 'dates-slider',
  templateUrl: './dates-slider.component.html',
  styleUrls: ['./dates-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatesSliderComponent {
  @Input() dates!: Array<IFlightInfo | IEmptyFlight>;
  @Input() back!: boolean;
}
