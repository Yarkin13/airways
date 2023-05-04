/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import {
  AbstractControl, ValidationErrors, FormBuilder, FormGroup
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiscountService } from 'src/app/user/services/discount.service';
import { PROMO_CODES } from 'src/app/shared/constants';

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
    const isCorrect = PROMO_CODES.some((el) => el.code === control.value) || !control.value;
    return isCorrect ? null : { isCorrectPromo: { value: control.value } };
  }

  onSubmit(value: string) {
    const disc = PROMO_CODES.find((el) => el.code === value)?.discount.toString();
    this.discount = disc || '';
    this.discountService.setDiscount(this.discount);
  }
}
