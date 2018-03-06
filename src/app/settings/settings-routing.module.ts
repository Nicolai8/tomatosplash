import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'settings',
        component: SettingsComponent,
      }
    ])
  ],
  exports: [ RouterModule ]
})
export class SettingsRoutingModule {
}
