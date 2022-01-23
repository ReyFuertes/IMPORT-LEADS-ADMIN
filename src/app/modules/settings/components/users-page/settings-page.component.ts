import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/modules/service/storage.service';

@Component({
  selector: 'il-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
  public activeIndex: number = 0;
  constructor(private storageSrv: StorageService) {
    const selectedIndex = this.storageSrv.get('settingsIndex');
    if (selectedIndex) {
      this.activeIndex = JSON.parse(selectedIndex) || 0;
    }
  }

  public handleChange(event: any): void {
    this.storageSrv.set('settingsIndex', JSON.stringify(event?.index));
  }
}
