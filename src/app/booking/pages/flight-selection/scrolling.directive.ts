import { Directive, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

interface DOMRectI {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x?: number;
  y?: number;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[scrollToCenter]',
})
export class MatTabScrollToCenterDirective implements OnDestroy, AfterViewInit {
  subs = new Subscription();
  constructor(private element: ElementRef) {
    this.subs.add(
      fromEvent(this.element.nativeElement, 'click').subscribe((clickedContainer) => {
        const scrollContainer = this.element.nativeElement.querySelector('.mat-mdc-tab-list');
        const currentScrolledContainerPosition: number = scrollContainer.scrollLeft;
        const newPositionScrollTo = this.calcScrollToCenterValue(
          clickedContainer,
          currentScrolledContainerPosition
        );

        scrollContainer.scroll({
          left: newPositionScrollTo,
          behavior: 'smooth',
        });
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  calcScrollToCenterValue(clickedContainer: any, currentScrolledContainerPosition: any): number {
    const scrolledButton: DOMRectI = (
      clickedContainer.target as HTMLElement
    ).getBoundingClientRect();
    const leftXOffset = (window.innerWidth - scrolledButton.width) / 2;
    const currentVisibleViewportLeft = scrolledButton.left;
    const neededLeftOffset = currentVisibleViewportLeft - leftXOffset;
    const newValueToSCroll = currentScrolledContainerPosition + neededLeftOffset;
    return newValueToSCroll;
  }

  ngAfterViewInit() {
    const q = this.element.nativeElement.querySelectorAll('.mdc-tab');
    q[5].click();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
