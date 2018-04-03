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
import { CommonModule, DatePipe } from '@angular/common';
import { ItemsListViewComponent } from './components/items-list-view/items-list-view.component';
import { MainActionsComponent } from './components/main-actions/main-actions.component';
import { OrdersListViewComponent } from './components/orders-list-view/orders-list-view.component';
import { ItemDialogComponent } from './components/item-dialog/item-dialog.component';
import { OrderEffects } from './effects/order';
import { OrdersService } from './services/orders.service';
import { EditOrderItemComponent } from './components/edit-order-item/edit-order-item.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { PrintReportDialogComponent } from './components/print-report-dialog/print-report-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    StoreModule.forFeature('home', reducers),
    EffectsModule.forFeature([
      ItemEffects,
      OrderEffects,
    ]),
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    ItemsListViewComponent,
    MainActionsComponent,
    OrdersListViewComponent,
    ItemDialogComponent,
    EditOrderItemComponent,
    EditOrderComponent,
    OrderDialogComponent,
    PrintReportDialogComponent,
  ],
  providers: [
    ItemsService,
    OrdersService,
    CheckForSettingsGuard,
    DatePipe,
  ],
  bootstrap: [
    ItemDialogComponent,
    OrderDialogComponent,
    PrintReportDialogComponent,
  ]
})
export class HomeModule {
}
