import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilityModule } from 'src/modules/common/utility/utility.module';
import { AppGuardHelper } from './services/guard-helper/guard-helper.service';
import { HttpErrorInterceptor } from './services/http-services/error.interceptor.service';
import { UniversalAppInterceptor } from './services/http-services/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageIntercept } from './services/utility-services/local-storage.service';
import { AppCookieService } from './services/utility-services/app.cookie.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UtilityModule,
    ServiceWorkerModule.register('ngsw-worker.js', 
    {
       enabled: environment.production,
       registrationStrategy: 'registerImmediately',
    })
  ],
  providers: [AppGuardHelper, AppCookieService, LocalStorageIntercept,
    { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
