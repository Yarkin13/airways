import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discount: BehaviorSubject<string>;

  constructor() {
    this.discount = new BehaviorSubject<string>('');
  }

  getDiscount(): Observable<string> {
    return this.discount.asObservable();
  }

  setDiscount(newValue: string): void {
    this.discount.next(newValue);
  }
}
