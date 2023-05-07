import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { PassengerType } from 'src/app/shared/models/booking.model';

@Component({
  selector: 'app-fare',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss'],
})
export class FareComponent {
  @Input() passengersType!: Array<PassengerType>;

  @Input() currency!: string;

  @Input() total!: string;
}
