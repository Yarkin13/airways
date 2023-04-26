import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Passenger } from 'src/app/shared/models/booked-flights.model';

@Component({
  selector: 'app-fare',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.scss'],
})
export class FareComponent implements OnChanges {
  @Input() passengers!: Array<Passenger>;

  @Input() currency!: string;

  total = '';

  ngOnChanges(): void {
    this.total = this.passengers
      .reduce(
        (acc, cur) => acc + Number(+cur.fare + +cur.charge) * cur.count,
        0
      )
      .toFixed(2);
  }
}
