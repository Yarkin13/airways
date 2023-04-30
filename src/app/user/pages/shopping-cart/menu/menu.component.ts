import {
  Component, Output, EventEmitter, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Trip } from '../shopping-cart.mock';

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

  onEdit() {
    this.editEvent.emit(this.element);
  }
}
