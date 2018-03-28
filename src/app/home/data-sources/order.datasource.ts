import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Order } from '../../../../models/order.model';
import { Observable } from 'rxjs/Observable';

export class OrderDataSource extends DataSource<Order> {
  constructor(private orders$: Observable<Order[]>) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Order[]> {
    return this.orders$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
