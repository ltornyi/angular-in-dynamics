import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { msalGuardConfig } from './msal/msalGuard.config';
import { msalInterceptorConfig } from './msal/msalInterceptor.config';
import { publicClientAppConfig } from './msal/publicClientApp.config';
import { OtherComponent } from './components/other/other.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot( new PublicClientApplication(publicClientAppConfig), msalGuardConfig, msalInterceptorConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: document["ANG_BASE_HREF"] }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
