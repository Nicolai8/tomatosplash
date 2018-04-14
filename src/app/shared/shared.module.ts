import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatSelectModule,
  MatGridListModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationService } from './services/configuration.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ElectronService } from './services/electron.service';
import { NotificationService } from './services/notification.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PrintService } from './services/print.service';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { ItemsService } from './services/items.service';
import { OrdersService } from './services/orders.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmService } from './services/confirm.service';
import { TranslateModule } from '@ngx-translate/core';
import { CheckForSettingsGuard } from './guards/check-for-settings.guard';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// AoT requires an exported function for factories
export function configurationServiceFactory(configurationService: ConfigurationService) {
  return function () {
    return configurationService.loadConfiguration();
  };
}

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    SpinnerComponent,
  ],
  declarations: [
    SpinnerComponent,
    ConfirmDialogComponent,
  ],
  bootstrap: [ ConfirmDialogComponent ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ElectronService,
        NotificationService,
        ConfigurationService,
        HttpService,
        AuthService,
        ItemsService,
        OrdersService,
        PrintService,
        ConfirmService,
        {
          provide: APP_INITIALIZER,
          useFactory: configurationServiceFactory,
          deps: [ ConfigurationService ],
          multi: true
        },
        CheckForSettingsGuard,
      ]
    };
  }
}
