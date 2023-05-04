import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FlightInfo, PassengerInfo } from 'src/app/shared/models/booking.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() passengers!: Array<PassengerInfo>;

  @Input() flight!: FlightInfo;
}
