/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DateSelectorComponent } from "./components/header/date-selector/date-selector.component";

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DateSelectorComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
