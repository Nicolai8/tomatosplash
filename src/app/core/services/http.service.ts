import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { ConfigurationService } from './configuration.service';
import * as fromRoot from '../reducers';
import { ShowNotification } from '../actions/layout';

@Injectable()
export class HttpService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService,
    private store$: Store<fromRoot.State>,
  ) {
  }

  private get apiUrl(): string {
    const config = this.configurationService.config$.getValue();
    return config.dbConnectionString;
  }

  post(url: string, data: any, headers?: HttpHeaders, isAbsoluteUrl: boolean = false) {
    return this.http.post(`${isAbsoluteUrl ? '' : this.apiUrl}${url}`, JSON.stringify(data), {
      headers: headers || this.headers,
      withCredentials: true,
    }).catch(this.errorHandler);
  }

  get(url: string, headers?: HttpHeaders) {
    return this.http.get(`${this.apiUrl}${url}`, {
      headers: headers || this.headers,
      withCredentials: true,
    }).catch(this.errorHandler);
  }

  put(url: string, data: any, headers?: HttpHeaders) {
    return this.http.put(`${this.apiUrl}${url}`, JSON.stringify(data), {
      headers: headers || this.headers,
      withCredentials: true,
    }).catch(this.errorHandler);
  }

  delete(url: string, headers?: HttpHeaders) {
    return this.http.delete(`${this.apiUrl}${url}`, {
      headers: headers || this.headers,
      withCredentials: true,
    }).catch(this.errorHandler);
  }

  private errorHandler(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    this.store$.dispatch(new ShowNotification(errMsg, false));
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
