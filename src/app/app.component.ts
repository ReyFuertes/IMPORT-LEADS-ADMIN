import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from './services/http-token-interceptor';
import { GenericDestroyPageComponent } from './shared/generics/generic-destroy-page';
import { loadAllRolesAction, loadCustomerAccessAction } from './store/actions/app.action';
import { removeNotificationAction } from './store/actions/notification.action';
import { RootState } from './store/root.reducer';
import { getIsLoggedInSelector } from './store/selectors/app.selector';
import { getSuccessSelector } from './store/selectors/notification.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends GenericDestroyPageComponent implements OnInit {
  public title: string = 'Import Leads Admin';
  public $notify: Observable<any>;
  public isLoggedIn: boolean = false;
  public svgPath: string = environment.svgPath;
  public hideTopNav: boolean = false;

  constructor(public loaderSrv: LoaderService, private store: Store<RootState>) {
    super();
    this.store.dispatch(loadCustomerAccessAction());
    this.store.dispatch(loadAllRolesAction());
  }

  ngOnInit(): void {
    this.$notify = this.store.pipe(select(getSuccessSelector), delay(300));
    this.$notify.subscribe(notified => {
      if (notified) {
        setTimeout(() => {
          this.onClose();
        }, 3000);
      }
    });

    this.store.pipe(select(getIsLoggedInSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  public onClose(): void {
    this.store.dispatch(removeNotificationAction());
    this.loaderSrv.isLoading.next(false);
  }
}
