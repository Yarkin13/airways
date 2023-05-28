import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'flight-type',
  templateUrl: './flight-type.component.html',
  styleUrls: ['./flight-type.component.scss'],
})
export class FlightTypeComponent {
  @Output() flightType = new EventEmitter<string>();
  @Input() type!: string;

  toggleFlightType(ev: MatRadioChange) {
    this.flightType.emit(ev.value);
  }
}
