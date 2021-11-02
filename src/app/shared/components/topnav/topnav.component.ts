import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISimpleItem } from '../../generics/generic.model';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { ICustomer } from 'src/app/models/customer.model';
import { StorageService } from 'src/app/modules/service/storage.service';
import { RootState } from 'src/app/store/root.reducer';

@Component({
  selector: 'il-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})

export class TopNavComponent extends GenericDestroyPageComponent implements OnInit {
  public apiImagePath: string = environment.apiImagePath;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public Customer: ICustomer;
  public menus: ISimpleItem[] = [{
    label: 'Dashboard',
    value: '/dashboard'
  }, {
    label: 'Customers',
    value: '/customer'
  }];

  constructor(
    private storageSrv: StorageService,
    private cdRef: ChangeDetectorRef,
    private store: Store<RootState>) {
    super();
  }
  
  ngOnInit() { }

  public get getProfilePic(): string {
    return this.Customer?.image ? this.apiImagePath + this.Customer?.image
      : this.imgPath + 'default-profile-pic.png';
  }

  public onLogout(): void { }
}
