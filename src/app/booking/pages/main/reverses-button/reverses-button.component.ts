import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'reverses-button',
  templateUrl: './reverses-button.component.html',
  styleUrls: ['./reverses-button.component.scss'],
})
export class ReversesButtonComponent {
  @Input() flightSearchForm!: FormGroup;

  reverseDirection() {
    const controlTo = this.flightSearchForm.get('from');
    const controlBack = this.flightSearchForm.get('destination');

    const valueTo = controlTo?.value;
    const valueBack = controlBack?.value;

    controlTo?.setValue(valueBack);
    controlBack?.setValue(valueTo);
  }
}
