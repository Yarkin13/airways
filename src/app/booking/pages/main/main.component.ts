import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAirports } from '../../airports.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  airports: IAirports[] = [
    { airport: 'Aberdeen', cod: 'ABZ', city: 'Dyce, United Kingdom' },
    { airport: 'Amsterdam', cod: 'AMS', city: 'Schiphol, Netherlands' },
    { airport: 'Baku', cod: 'GYD', city: 'Heydar Aliyev, Azerbaijan' },
    { airport: 'Barcelona', cod: 'BCN', city: 'El Prat, Spain' },
    { airport: 'Catania', cod: 'CTA', city: 'Fontanarossa, Italy' },
    { airport: 'Dublin', cod: 'DUB', city: 'Ireland' },
  ];

  flightSearchForm: FormGroup = new FormGroup({
    from: new FormControl(''),
    destination: new FormControl(''),
    dateTo: new FormControl<Date | null>(null),
    dateBack: new FormControl<Date | null>(null),
    adults: new FormControl(0),
    child: new FormControl(0),
    infant: new FormControl(0),
  });

  flightType = 'roundTrip';

  changeFlightType(newType: string) {
    this.flightType = newType;
    this.flightSearchForm.get('dateTo')?.reset();
    this.flightSearchForm.get('dateBack')?.reset();
  }

  onSubmit(): void {
    console.log(this.flightSearchForm.value);
  }
}
