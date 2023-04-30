/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import {
  AbstractControl, ValidationErrors, FormBuilder, FormGroup
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiscountService } from 'src/app/user/services/discount.service';

const CORRECT_PROMO = [
  { code: 'sun', discount: 5 },
  { code: 'summer', discount: 10 },
];

@Component({
  selector: 'app-promo-input',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule],
  templateUrl: './promo-input.component.html',
  styleUrls: ['./promo-input.component.scss'],
})
export class PromoInputComponent {
  public promoForm: FormGroup;

  discount = '';

  constructor(private fb: FormBuilder, private discountService: DiscountService,) {
    this.promoForm = this.fb.group({
      promoCode: ['', this.isCorrectPromo],
    }, { updateOn: 'submit' });
  }

  isCorrectPromo(control: AbstractControl): ValidationErrors | null {
    const isCorrect = CORRECT_PROMO.some((el) => el.code === control.value) || !control.value;
    return isCorrect ? null : { isCorrectPromo: { value: control.value } };
  }

  onSubmit(value: string) {
    const disc = CORRECT_PROMO.find((el) => el.code === value)?.discount.toString();
    this.discount = disc || '';
    this.discountService.setDiscount(this.discount);
  }
}
