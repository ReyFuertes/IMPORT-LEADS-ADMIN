import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent extends GenericControl<ISimpleItem> {
  @Input() public toggleMask: boolean = true;
  
  public passwordRegex: string = '^(?=.{8,})';
  constructor() {
    super();
  }
}