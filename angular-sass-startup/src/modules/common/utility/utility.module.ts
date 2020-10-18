import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SEOService } from './services/seo.service';
import { CentralizedErrorHandlingService, ErrorLoggingService, ErrorService, GlobalErrorHandler } from './services/error-Handler/index';
import { DateAgoPipe } from './pipes/dateago.pipe';
import { DateTimeComponent } from './components/datetime.component/datetime.component';
import { SafePipe } from './pipes/domSanitizerPipe';

@NgModule({
  declarations: [
    DateAgoPipe, DateTimeComponent, SafePipe
   ],
  imports: [
    CommonModule,
  ],
  exports: [DateAgoPipe, DateTimeComponent, SafePipe],
  providers: [CentralizedErrorHandlingService, ErrorLoggingService, ErrorService, GlobalErrorHandler, SEOService]
})
export class UtilityModule {
}
