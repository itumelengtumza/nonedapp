import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, Platform, PopoverController } from '@ionic/angular';
import { SettingsComponent } from '../components/settings/settings.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private popoverCtrl: PopoverController, private platform: Platform, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        navigator['app'].exitApp();
      }
    });
  }

  async settingsPopover() {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverCtrl.create({
      component: SettingsComponent,
      cssClass: 'popover_setting',
      componentProps: {
        site: siteInfo
      }
    });

    popover.onDidDismiss().then((result) => {
      console.log(result);
    });

    return await popover.present();
    /** Sync event from popover component */

  }
}
