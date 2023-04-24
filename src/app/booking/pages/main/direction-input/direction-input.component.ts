import {
  Component, Input, ViewEncapsulation, OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { IAirports } from 'src/app/booking/airports.model';

@Component({
  selector: 'direction-input',
  templateUrl: './direction-input.component.html',
  styleUrls: ['./direction-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DirectionInputComponent implements OnInit {
  @Input() formName!: FormGroup;
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() placeholder!: string;
  @Input() airports!: IAirports[];

  filteredAirports!: Observable<IAirports[]>;

  ngOnInit() {
    this.filteredAirports = this.formName.controls[
      this.controlName
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );
  }

  private filter(value: string): IAirports[] {
    const filterValue = value.toLowerCase();
    return this.airports.filter((airport) => airport.airport.toLowerCase().includes(filterValue));
  }
}
