import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ISimpleItem } from '../../generics/generic.model';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { RootState } from 'src/app/store/root.reducer';
import { logoutAction } from 'src/app/modules/auth/store/auth.action';
import { IUser } from 'src/app/modules/auth/auth.models';
import { ROLESROUTE, SETTINGSROUTE } from '../../constants/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'il-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})

export class TopNavComponent extends GenericDestroyPageComponent {
  public apiImagePath: string = environment.apiImagePath;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public user: IUser;
  public menus: ISimpleItem[] = [
    {
      label: 'Customers',
      value: '/customer'
    },
    // {
    //   label: 'Billing',
    //   value: '/billing'
    // }, {
    //   label: 'Invoice',
    //   value: '/invoice'
    // }
  ];

  constructor(private router: Router, private store: Store<RootState>) {
    super();
  }

  public gotoSettings(): void {
    this.router.navigateByUrl(SETTINGSROUTE);
  }

  public gotoRoles(): void {
    this.router.navigateByUrl(ROLESROUTE);
  }

  public get getProfilePic(): string {
    return this.imgPath + 'default-profile-pic.png'; //this.user?.image ? this.apiImagePath + this.user?.image :
  }

  public onLogout(): void {
    this.store.dispatch(logoutAction());
  }
}
