
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { Injectable } from '@angular/core';
import { IAccess, ICustomer, ICustomerPayload, ICustomerResponse, ICustomerUser } from '../models/customer.model';
import { StorageService } from '../modules/service/storage.service';
import { IRole } from '../models/generic.model';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService<any> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'user', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class CustomerUserService extends BaseService<ICustomer | ICustomerPayload | ICustomer[] | ICustomerUser> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'customer-user', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class CustomerService extends BaseService<ICustomerResponse | ICustomerPayload | ICustomer> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'customer', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class AccessService extends BaseService<IAccess> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'access', storageSrv);
  }
}
@Injectable({ providedIn: 'root' })
export class RolesService extends BaseService<IRole> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'roles', storageSrv);
  }
}