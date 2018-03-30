import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CheckForSettingsGuard } from './guards/check-for-settings.guard';
import { ItemsListViewComponent } from './components/items-list-view/items-list-view.component';
import { HomeComponent } from './home.component';
import { MainActionsComponent } from './components/main-actions/main-actions.component';
import { OrdersListViewComponent } from './components/orders-list-view/orders-list-view.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [ CheckForSettingsGuard ],
        children: [
          {
            path: '',
            component: MainActionsComponent,
          },
          {
            path: 'items',
            component: ItemsListViewComponent,
          },
          {
            path: 'orders',
            component: OrdersListViewComponent,
          },
          {
            path: 'order/edit',
            component: EditOrderComponent,
          }
        ]
      }
    ])
  ],
  exports: [ RouterModule ],
})
export class HomeRoutingModule {
}
