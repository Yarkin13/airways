import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-currency-selector",
  templateUrl: "./currency-selector.component.html",
  styleUrls: ["./currency-selector.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CurrencySelectorComponent {
  selected = "option1";
}
