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
  MatPaginatorModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationService } from './services/configuration.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ElectronService } from './services/electron.service';
import { NotificationService } from './services/notification.service';
import { CheckForSettingsGuard } from './guards/check-for-settings.guard';

// AoT requires an exported function for factories
export function configurationServiceFactory(configurationService: ConfigurationService) {
  return function () {
    return configurationService.loadConfiguration();
  };
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    FlexLayoutModule,
  ],
  exports: [
    ReactiveFormsModule,
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
    FlexLayoutModule,
  ],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ElectronService,
        ConfigurationService,
        NotificationService,
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
