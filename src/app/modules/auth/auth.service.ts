import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { ILoginCredential } from './auth.models';
import { StorageService } from '../service/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<ILoginCredential> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'auth', storageSrv);
  }
}