import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { IAirports } from 'src/app/shared/models/airports.model';

@Component({
  selector: 'direction-input',
  templateUrl: './direction-input.component.html',
  styleUrls: ['./direction-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DirectionInputComponent implements OnInit {
  @Input() flightSearchForm!: FormGroup;
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() placeholder!: string;
  @Input() error!: boolean;

  direction: FormControl = new FormControl('');
  airports!: IAirports[];
  inputKey = '';

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.formDirection?.valueChanges.subscribe((data) => {
      if (data.name !== this.direction.value) {
        this.direction.setValue(data.name);
        this.inputKey = data.key;
      }
    });

    this.direction.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(async (query) => {
          this.httpService.getAirports(query).subscribe((data: IAirports[]) => {
            this.airports = data;
          });
        })
      )
      .subscribe();

    this.direction.setValue(this.formDirection?.value.name);
    this.inputKey = this.formDirection?.value.key;
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent) {
    const [value, key] = event.option.value.split('|');

    this.direction.setValue(value);
    this.inputKey = key;

    this.formDirection?.setValue({
      key,
      name: value,
    });
  }

  get formDirection() {
    return this.flightSearchForm.get(this.controlName);
  }
}
