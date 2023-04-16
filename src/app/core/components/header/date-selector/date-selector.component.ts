import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-date-selector",
  templateUrl: "./date-selector.component.html",
  styleUrls: ["./date-selector.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DateSelectorComponent {
  selected = "option1";
}
