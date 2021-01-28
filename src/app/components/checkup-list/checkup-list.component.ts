import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, PopoverController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-checkup-list',
  templateUrl: './checkup-list.component.html',
  styleUrls: ['./checkup-list.component.scss'],
})
export class CheckupListComponent implements OnInit {

  public user_type = [];
  
  formValid: boolean;
  site: any;
  postData = {
    table_name: null
  };
  postDat = {
    email: ''
    };

  constructor ( private popoverCtrl: PopoverController, 
    public navParams: NavParams, private authService: AuthService, private router: Router, 
    private toastService: ToastService, private offlineStorageService: OfflineStorageService) {
}

  ngOnInit() {
    // this.siteInfo = this.navParams.get('site');
    console.log(this.site);
    this.authService.userData$.subscribe((res:any) => {
      if(res.email !== undefined) {
        this.postDat.email = res.email;
      } 
    });
    this.offlineStorageService.get(AuthConstants.CHECKUP_PICKLIST).then((res) => {
      if (res) {
        console.log(res); 
        this.user_type = res.filter(list => {
          return list.id <= 9;
        })
        console.log(this.user_type); 
      }
      else {
        console.log('Nothing as yet, let\'s fix that!');
        this.getCheckupPicklist();
      }
    });
  }

// this will be removed if getCheckupPicklist() is called before this component, go to x, 6 lines below
  getCheckupPicklist() {
    this.postData.table_name = 'checkups_picklist';
    this.authService.postData('getCheckupPicklist',this.postData).subscribe(
    (res: any) => {
        if (res) {//data returned
          // x - this also removed
          this.user_type = res.filter(list => {
            return list.id <= 9;
          })
          console.log(res);
          console.log('from external server');
            this.offlineStorageService.store(AuthConstants.CHECKUP_PICKLIST, res);
            // e.g. this.offlineStorageService.store('First Trimester', [{id:'1',sub_title:..,text:..,}, ...])
        } else {
            console.log('Post Error',res.msg);
        }
    },
    (error: any) => {
        console.log(error);
        //console.log('Login Error','Please check internet connection!');
        }
    );
}

  IsOneChecked() {
    let isOneChecked = false;
    for(var i = 0; i < this.user_type.length; i++) {
      isOneChecked = isOneChecked || this.user_type[i].isChecked;
    }
    return isOneChecked;
  }
  do_sth(index) {
  
    if(!this.user_type[index].isChecked) {
      this.user_type[index].isChecked = true;
    }
    else {
      this.user_type[index].isChecked = false;
    }
    this.formValid = this.IsOneChecked();
    console.log(this.user_type[index].val);
  }
  pickAction() {
    let selected = [];
    for(var i = 0; i < this.user_type.length; i++) {
      if(this.user_type[i].isChecked) {
        selected.push(this.user_type[i].text);
      }
    }
    this.popoverCtrl.dismiss(selected);
  }
profile() {
  // code for setting wifi option in apps
  this.popoverCtrl.dismiss({from:'itu'});
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
