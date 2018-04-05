import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  HttpClientModule,
  HttpClient
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

// NGRX
import { metaReducers, reducers } from './shared/reducers';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects } from './shared/effects/config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutEffects } from './shared/effects/layout';
import { SettingsModule } from './settings/settings.module';
import { HomeModule } from './home/home.module';
import { PrintEffects } from './shared/effects/print';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      // logOnly: AppConfig.production,
    }),
    EffectsModule.forRoot([
      ConfigEffects,
      LayoutEffects,
      PrintEffects,
    ]),
    AppRoutingModule,
    SharedModule.forRoot(),
    SettingsModule,
    HomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
