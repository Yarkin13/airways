import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { DirectionInputComponent } from './components/direction-input/direction-input.component';
import { DatesComponent } from './components/dates/dates.component';
import { PassengersComponent } from './components/passengers/passengers.component';

@NgModule({
  declarations: [LoaderComponent, DirectionInputComponent, PassengersComponent, DatesComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    DirectionInputComponent,
    PassengersComponent,
    DatesComponent,
  ],
})
export class SharedModule {}
