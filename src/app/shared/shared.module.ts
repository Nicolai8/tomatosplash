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
    MatDatepickerModule,
    MatNativeDateModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    SpinnerComponent,
  ],
  declarations: [
    SpinnerComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ElectronService,
        ConfigurationService,
        NotificationService,
        PrintService,
        {
          provide: APP_INITIALIZER,
          useFactory: configurationServiceFactory,
          deps: [ ConfigurationService ],
          multi: true
        },
      ]
    };
  }
}
