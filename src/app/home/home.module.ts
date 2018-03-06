import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ItemsService } from './services/items.service';
import { reducers } from './reducers';
import { ItemEffects } from './effects/item';
import { CheckForSettingsGuard } from './guards/check-for-settings.guard';
import { CommonModule } from '@angular/common';
import { ItemsListViewComponent } from './components/items-list-view/items-list-view.component';
import { MainActionsComponent } from './components/main-actions/main-actions.component';
import { OrdersListViewComponent } from './components/orders-list-view/orders-list-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    StoreModule.forFeature('home', reducers),
    EffectsModule.forFeature([
      ItemEffects
    ]),
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    ItemsListViewComponent,
    MainActionsComponent,
    OrdersListViewComponent,
  ],
  providers: [
    ItemsService,
    CheckForSettingsGuard,
  ],
})
export class HomeModule {
}
