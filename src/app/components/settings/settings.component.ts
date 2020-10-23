import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  site: any;

  ngOnInit() {
    // this.siteInfo = this.navParams.get('site');
    console.log(this.site);
  }

  constructor ( private popoverCtrl: PopoverController, 
    public navParams: NavParams, private authService: AuthService) {
}
wifiSetting() {
  // code for setting wifi option in apps
  this.popoverCtrl.dismiss();
}

logout() {
  // code for logout
  this.authService.logout();
  this.popoverCtrl.dismiss();
}

eventFromPopover() {
  this.popoverCtrl.dismiss('edupala.com');
}

}
