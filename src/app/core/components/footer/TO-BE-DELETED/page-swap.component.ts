import { Component } from '@angular/core';

@Component({
  selector: 'app-page-swap',
  templateUrl: './page-swap.component.html',
  styleUrls: ['./page-swap.component.scss'],
})
export class PageSwapComponent {
  isShow = true;

  handleClick() {
    this.isShow = false;
  }
}
