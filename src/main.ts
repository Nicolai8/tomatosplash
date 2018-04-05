import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { BootstrapOptions } from '@angular/core/src/application_ref';
import { CompilerOptions } from '@angular/core/src/linker/compiler';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, <CompilerOptions & BootstrapOptions>{
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));
