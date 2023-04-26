import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  passengers: ('Adult' | 'Child' | 'Infant')[] = ['Adult', 'Child', 'Infant']; // TODO mocks
}
