import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ConfigurationService } from './services/configuration.service';
import { ElectronService } from './services/electron.service';
import { NotificationService } from './services/notification.service';
import { PrintService } from './services/print.service';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { ItemsService } from './services/items.service';
import { OrdersService } from './services/orders.service';
import { ConfirmService } from './services/confirm.service';
import { CheckForSettingsGuard } from './guards/check-for-settings.guard';

// AoT requires an exported function for factories
export function configurationServiceFactory(configurationService: ConfigurationService) {
  return function () {
    return configurationService.loadConfiguration();
  };
}

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
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
