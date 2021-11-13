import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ISimpleItem } from '../../generics/generic.model';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { RootState } from 'src/app/store/root.reducer';
import { logoutAction } from 'src/app/modules/auth/store/auth.action';
import { IUser } from 'src/app/modules/auth/auth.models';

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
  public menus: ISimpleItem[] = [{
    label: 'Dashboard',
    value: '/dashboard'
  }, {
    label: 'Customers',
    value: '/customer'
  }];

  constructor(private store: Store<RootState>) {
    super();
  }

  public get getProfilePic(): string {
    return this.user?.image ? this.apiImagePath + this.user?.image
      : this.imgPath + 'default-profile-pic.png';
  }

  public onLogout(): void {
    this.store.dispatch(logoutAction());
  }
}
