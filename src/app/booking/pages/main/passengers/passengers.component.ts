import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PASSENGERS_TYPE } from 'src/app/shared/constants';

@Component({
  selector: 'passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PassengersComponent {
  @Input() formName!: FormGroup;

  passengersType = PASSENGERS_TYPE;

  decrease(id: string) {
    const control = this.formName.get(id);
    control?.setValue(control.value - 1);
  }

  increase(id: string) {
    const control = this.formName.get(id);
    control?.setValue(control.value + 1);
  }
}
