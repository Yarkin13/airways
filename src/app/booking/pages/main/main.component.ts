import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AIRPORTS } from 'src/app/shared/constants';
import { IAirports } from '../../airports.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  airports: IAirports[] = AIRPORTS;

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
  }

  onSubmit(): void {
    console.log(this.flightSearchForm.value);
  }
}
