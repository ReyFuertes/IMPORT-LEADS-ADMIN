import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Directive } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { StorageService } from '../modules/service/storage.service';

@Directive()
export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    public http: HttpClient,
    private entity: string = '',
    private storageSrv: StorageService) {
    this.baseUrl = environment.apiUrl;
  }

  private getToken(): string {
    return JSON.parse(this.storageSrv.get('at') || null) ?
      JSON.parse(this.storageSrv.get('at')).accessToken : null;
  }

  protected commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  protected binaryHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  private removeNullProps(payload: any): any {
    let formattedPayload: any;
    if (!Array.isArray(payload)) {
      formattedPayload = _.pickBy(payload, _.identity);
    } else {
      formattedPayload = Object.values(_.pickBy(payload, o => o !== null && o !== undefined));
    }
    return formattedPayload;
  }

  public post(object?: T | T[], param?: string, overrideUrl?: string): Observable<T | any> {
    const url: string = `${overrideUrl ?? this.baseUrl}${this.entity}${this.fmtParam(param)}`;
    return this.http.post<any>(url, this.removeNullProps(object), { headers: this.commonHeaders() });
  }

  public delete(id?: string, param?: string): Observable<T | any> {
    return this.http.delete(`${this.baseUrl}${this.entity}/${id}${this.fmtParam(param)}`,
      { headers: this.commonHeaders() });
  }

  public patch(object: T | any, addtnlParam?: string, overrideUrl?: string): Observable<T | any> {
    const url: string = `${overrideUrl ?? this.baseUrl}${this.entity}${this.fmtParam(addtnlParam)}`;
    return this.http.patch<any>(url, this.removeNullProps(object), { headers: this.commonHeaders() });
  }

  private fmtParam(param?: string): string {
    return `${param ? '/' + param : ''}`
  }

  private fmtGetParam(param?: string): string {
    return param ? `?${param}` : ''
  }

  public getAll(param?: string): Observable<T[] | any> {
    return this.http.get<T[]>(`${this.baseUrl}${this.entity}${this.fmtGetParam(param)}`,
      { headers: this.commonHeaders() });
  }

  public getById(id: string, addtnlParam?: string): Observable<T | any> {
    return this.http.get<T>(`${this.baseUrl}${this.entity}/${id}${this.fmtParam(addtnlParam)}`, { headers: this.commonHeaders() });
  }

  public getBinaryById(id: string, addtnlParam?: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.entity}/${id}${this.fmtParam(addtnlParam)}`,
      { headers: this.binaryHeaders() });
  }
  
  public getOne(param?: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.entity}${this.fmtGetParam(param)}`,
      { headers: this.commonHeaders() });
  }

  public exist(object?: T, param?: string, overrideUrl?: string): Observable<boolean> {
    const url: string = `${overrideUrl ?? this.baseUrl}${this.entity}${this.fmtParam(param)}`;
    return this.http.post<any>(url, this.removeNullProps(object), { headers: this.commonHeaders() });
  }

  public upload(object?: any, addtnlParam?: string): Observable<T> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: "application/json"
    });
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<T>(`${this.baseUrl}${this.entity}${this.fmtParam(addtnlParam)}`, object, { headers: headers });
  }
}
