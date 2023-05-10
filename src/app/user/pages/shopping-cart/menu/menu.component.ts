import {
  Component, Output, EventEmitter, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Trip } from 'src/app/shared/models/shopping-cart.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() public element!: Trip;
  @Output() public editEvent: EventEmitter<Trip> = new EventEmitter();
  @Output() public deleteEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    private store: Store
  ) {}

  onEdit() {
    this.editEvent.emit(this.element);
  }

  onDelete() {
    this.deleteEvent.emit(this.element.id);
  }
}
