import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Passenger, BookedFlight } from 'src/app/shared/models/booked-flights.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() passengers!: Array<Passenger>;

  @Input() flight!: BookedFlight;
}
