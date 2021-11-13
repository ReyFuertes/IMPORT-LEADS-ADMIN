import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CUSTOMERROUTE } from 'src/app/shared/constants/routes';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { emailRegex } from 'src/app/shared/util/email';
import { RootState } from 'src/app/store/root.reducer';
import { getIsLoggedInSelector, getIsLoggingInSelector, getIsLoginFailedSelector } from 'src/app/store/selectors/app.selector';
import { environment } from 'src/environments/environment';
import { isLoggingInAction, loginAction } from '../../store/auth.action';
import { getLoginErrorSelector } from '../../store/auth.selector';

@Component({
  selector: 'cma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends GenericDestroyPageComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public $isLogging: Observable<boolean>;
  public $isLoginFailed: Observable<boolean>;
  public hasError: boolean = false;
  public loginError: boolean = false;

  constructor(private router: Router, private store: Store<RootState>, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      username: ['b.boterkooper@chinaimportleads.com', Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: ['p@55w0rd', Validators.required]
    });

    this.store.pipe(select(getLoginErrorSelector))
      .pipe(debounceTime(1000))
      .subscribe(res => {
        this.loginError = res;
      });

    this.store.pipe(select(getIsLoggedInSelector)).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigateByUrl(CUSTOMERROUTE);
      }
    });
  }

  ngOnInit() {
    this.$isLogging = this.store.pipe(select(getIsLoggingInSelector));
    this.$isLoginFailed = this.store.pipe(select(getIsLoginFailedSelector), debounceTime(1000));

    document.body.style.height = '100vh';
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.store.dispatch(isLoggingInAction());
      this.store.dispatch(loginAction({
        payload: { username: String(username).toLowerCase(), password }
      }));
    }
  }
}
