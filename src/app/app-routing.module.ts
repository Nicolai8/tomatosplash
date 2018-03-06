import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { CheckForSettingsGuard } from './shared/guards/check-for-settings.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ CheckForSettingsGuard ],
  },
  {
    path: 'settings',
    component: SettingsComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
