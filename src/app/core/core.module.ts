import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DateSelectorComponent } from './components/header/date-selector/date-selector.component';
import { SharedModule } from '../shared/shared.module';
import { CurrencySelectorComponent } from './components/header/currency-selector/currency-selector.component';
import { MaterialModule } from '../material/material.module';
import { AuthComponent } from './components/auth/auth.component';
import { SingUpFormComponent } from './components/auth/sing-up-form/sing-up-form.component';
import { LogInFormComponent } from './components/auth/log-in-form/log-in-form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DateSelectorComponent,
    CurrencySelectorComponent,
    AuthComponent,
    SingUpFormComponent,
    LogInFormComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule, MaterialModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
