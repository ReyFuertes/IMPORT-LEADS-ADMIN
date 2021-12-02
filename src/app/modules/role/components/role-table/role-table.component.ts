import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRole } from 'src/app/models/generic.model';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
import { getRolesSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss']
})
export class RoleTableComponent implements OnInit {
  public $roles: Observable<ISimpleItem[]>;

  constructor(private store: Store<RootState>) {
    this.$roles = this.store.pipe(select(getRolesSelector));
  }

  ngOnInit(): void { }
}
