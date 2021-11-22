
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IAccess, ICustomer, ICustomerPayload, ICustomerResponse, ICustomerUser } from '../models/customer.model';
import { StorageService } from '../modules/service/storage.service';
import { IRole } from '../models/generic.model';

@Injectable({ providedIn: 'root' })
export class TenantUserService extends BaseService<any> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'tenant', storageSrv);
  }
}