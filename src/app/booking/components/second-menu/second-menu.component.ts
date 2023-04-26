import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-second-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss']
})
export class SecondMenuComponent {

}
