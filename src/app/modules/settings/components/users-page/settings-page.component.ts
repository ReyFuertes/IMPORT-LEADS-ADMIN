import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  public activeIndex: number = 0;
  constructor() { }

  ngOnInit(): void { }
}
