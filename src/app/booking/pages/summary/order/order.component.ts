import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { BookedFlight, Passengers } from '../booked-flights.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() passengers!: Array<Passengers>;

  @Input() flight!: BookedFlight;
}
