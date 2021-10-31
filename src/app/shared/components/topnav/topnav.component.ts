import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ISimpleItem } from '../../generics/generic.model';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { IUser } from 'src/app/models/user.model';
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
  public user: IUser;
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
    return this.user?.image ? this.apiImagePath + this.user?.image
      : this.imgPath + 'default-profile-pic.png';
  }

  public onLogout(): void { }
}
