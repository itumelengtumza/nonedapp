import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  site: any;
  postData = {
    email: ''
    };

  constructor ( private popoverCtrl: PopoverController, 
    public navParams: NavParams, private authService: AuthService, private router: Router, 
    private toastService: ToastService) {
}

  ngOnInit() {
    // this.siteInfo = this.navParams.get('site');
    console.log(this.site);
    this.authService.userData$.subscribe((res:any) => {
      if(res.email !== undefined) {
        this.postData.email = res.email;
      } 
    });
  }

profile() {
  // code for setting wifi option in apps
  this.popoverCtrl.dismiss();
}

logout() {
  // code for logout
  this.authService.logout();
  this.popoverCtrl.dismiss();
}

delUserFromRemoteDB() {
  this.authService.deleteUserFromDB(this.postData).subscribe((res: any) => {
    console.log(res);
    this.toastService.presentToast(res.msg);
    this.router.navigate(['/login']);
},
(error: any) => {
this.toastService.presentToast('Network Issue.');
}
);
  this.popoverCtrl.dismiss('edupala.com');
}

}
