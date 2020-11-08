import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { DateTimeComponent } from './components/datetime.component/datetime.component';
import { DateAgoPipe } from './pipes/dateago.pipe';
import { SafePipe } from './pipes/domSanitizerPipe';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, DateTimeComponent, SafePipe, DateAgoPipe],
  exports: [LoaderComponent, DateTimeComponent, SafePipe, DateAgoPipe],
})
export class SharedModule {}
