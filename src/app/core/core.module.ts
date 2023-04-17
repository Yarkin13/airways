import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DateSelectorComponent } from "./components/header/date-selector/date-selector.component";
import { SharedModule } from "../shared/shared.module";
import { CurrencySelectorComponent } from "./components/header/currency-selector/currency-selector.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DateSelectorComponent,
    CurrencySelectorComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
