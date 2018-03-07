import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Item } from '../../../../models/item.model';
import { Observable } from 'rxjs/Observable';

export class ItemDataSource extends DataSource<Item> {
  constructor(private items$: Observable<Item[]>) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Item[]> {
    return this.items$;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
