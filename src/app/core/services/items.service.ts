import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Item } from '../../../../models/item.model';
import { HttpService } from './http.service';

@Injectable()
export class ItemsService {
  private itemUrl = '/api/item';

  constructor(
    private http: HttpService,
  ) {
  }

  public get(): Observable<Item[]> {
    return this.http.get(this.itemUrl);
  }

  public add(item: Item): Observable<Item> {
    return this.http.put(this.itemUrl, item);
  }

  public edit(id: string, item: Item): Observable<Item> {
    return this.http.post(`${this.itemUrl}/${id}`, item);
  }

  public remove(id: string): Observable<any> {
    return this.http.delete(`${this.itemUrl}/${id}`);
  }
}
