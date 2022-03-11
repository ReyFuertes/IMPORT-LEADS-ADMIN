import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from './services/http-token-interceptor';
import { GenericDestroyPageComponent } from './shared/generics/generic-destroy-page';
import { loadAllRoleAction, loadAccessAction, initAppAction } from './store/actions/app.action';
import { removeFailedNotificationAction, removeSuccessNotificationAction } from './store/actions/notification.action';
import { getSubscriptionsAction } from './store/actions/subscription.action';
import { RootState } from './store/root.reducer';
import { getIsLoggedInSelector } from './store/selectors/app.selector';
import { getNotificationFailedSelector, getNotificationSuccessSelector } from './store/selectors/notification.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends GenericDestroyPageComponent implements OnInit {
  public title: string = 'Import Leads Admin';
  public $notifySuccess: Observable<any>;
  public $notifyFailed: Observable<any>;
  public isLoggedIn: boolean = false;
  public svgPath: string = environment.svgPath;
  public hideTopNav: boolean = false;

  constructor(public loaderSrv: LoaderService, private store: Store<RootState>) {
    super();
    this.store.dispatch(initAppAction());
  }

  ngOnInit(): void {
    this.$notifySuccess = this.store.pipe(select(getNotificationSuccessSelector), delay(300));
    this.$notifySuccess.subscribe(notified => {
      if (notified) {
        setTimeout(() =>  this.onCloseSuccessNotification(), 3000);
      }
    });

    this.$notifyFailed = this.store.pipe(select(getNotificationFailedSelector), delay(300));
    this.$notifyFailed.subscribe(notified => {
      if (notified) {
        setTimeout(() =>  this.onCloseFailedNotification(), 3000);
      }
    });

    this.store.pipe(select(getIsLoggedInSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        if (this.isLoggedIn) {
          this.store.dispatch(loadAccessAction());
          this.store.dispatch(loadAllRoleAction());
          this.store.dispatch(getSubscriptionsAction());
        }
      });
  }

  public onCloseFailedNotification(): void {
    this.store.dispatch(removeFailedNotificationAction());
    this.loaderSrv.isLoading.next(false);
  }
  
  public onCloseSuccessNotification(): void {
    this.store.dispatch(removeSuccessNotificationAction());
    this.loaderSrv.isLoading.next(false);
  }
}
