import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.formDirection?.valueChanges
      .pipe(
        switchMap(async (data) => {
          if (data.name !== this.direction.value) {
            this.direction.setValue(data.name);
          }
        })
      )
      .subscribe();

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
  }

  onSelectionChange() {
    this.formDirection?.setValue({
      key: this.inputKey,
      name: this.direction.value,
    });
  }

  get formDirection() {
    return this.flightSearchForm.get(this.controlName);
  }

  get inputKey() {
    if (!this.airports) {
      return '';
    }

    return this.airports.find((item) => item.name === this.direction.value)
      ?.key;
  }
}
