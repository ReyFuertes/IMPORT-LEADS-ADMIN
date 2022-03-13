import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { ICustomer } from 'src/app/models/customer.model';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { RootState } from 'src/app/store/root.reducer';
import { getSubscriptionsSelector } from 'src/app/store/selectors/subscription.selector';

@Component({
  selector: 'il-invite-customer-dialog',
  templateUrl: './invite-customer-dialog.component.html',
  styleUrls: ['./invite-customer-dialog.component.scss']
})
export class InviteCustomerDialogComponent extends GenericDestroyPageComponent implements OnInit {
  public actionText: string[] = ['ADD', 'UPDATE'];
  public subscriptions: ISimpleItem[];
  public form: FormGroup;
  public customers: ICustomer[] = [];
  public formCustomersArray: FormArray;

  constructor(private store: Store<RootState>, private fb: FormBuilder, public dialogRef: MatDialogRef<InviteCustomerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.form = this.fb.group({
      customers: new FormArray([]),
    });
    this.formCustomersArray = this.form.get('customers') as FormArray;
  }

  ngOnInit(): void {
    this.store.pipe(select(getSubscriptionsSelector), takeUntil(this.$unsubscribe))
      .subscribe(subscriptions => {
        this.subscriptions = subscriptions?.map(sub => ({ label: sub.name, value: sub.id }));

        this.addCustomer();
      });
  }

  public get getCustomersFormArr(): any {
    return this.form.get('customers')['controls'] as any;
  }

  public removeCustomer(index: number): void {
    this.formCustomersArray.removeAt(index);
  }

  public addCustomer(): any {
    this.formCustomersArray.push(this.createCustomer(Object.assign({}, {
      email: '',
      subscription: this.subscriptions[0].value
    })));
  }

  public get hasCustomers(): boolean {
    return this.formCustomersArray?.length > 0;
  }

  public trackByFn(index: any, item: any) {
    return index;
  }

  public createCustomer(item: ICustomer) {
    return this.fb.group(item);
  }

  public onInvite(): void {
    if (this.hasCustomers) {
      const payload = this.formCustomersArray.value?.map(value => {
        return {
          email: value?.email.trim(),
          subscription: value?.subscription.trim()
        }
      });
      this.dialogRef.close(payload);
    }
  }
}
