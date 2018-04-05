import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfigurationService } from './configuration.service';
import { NotificationService } from './notification.service';

@Injectable()
export class HttpService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService,
    private notificationService: NotificationService,
  ) {
  }

  private get apiUrl(): string {
    const config = this.configurationService.config$.getValue();
    return config.dbConnectionString;
  }

  post(url: string, data: any, headers?: HttpHeaders) {
    return this.http.post(`${this.apiUrl}${url}`, JSON.stringify(data), {
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
    this.notificationService.showNotification(errMsg, false);
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
