import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from '../../../../models/order.model';
import { Pagination } from '../../../../models/pagination.model';
import { HttpService } from './http.service';

@Injectable()
export class OrdersService {
  private orderUrl = '/api/order';

  constructor(
    private http: HttpService,
  ) {
  }

  public get(page: number, limit: number): Observable<Pagination<Order>> {
    return this.http.get(`${this.orderUrl}/?page=${page + 1}&limit=${limit}`);
  }

  public add(order: Order): Observable<Order> {
    return this.http.put(this.orderUrl, order);
  }

  public edit(id: string, order: Order): Observable<Order> {
    return this.http.post(`${this.orderUrl}/${id}`, order);
  }

  public remove(id: string): Observable<string> {
    return this.http.delete(`${this.orderUrl}/${id}`);
  }

  public proceed(id: string): Observable<string> {
    return this.http.post(`${this.orderUrl}/proceed/${id}`, {});
  }

  public getDailyReport(date: Date): Observable<Order[]> {
    return this.http.post(`${this.orderUrl}/daily-report`, { date });
  }
}
