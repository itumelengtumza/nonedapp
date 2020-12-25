import { Component, OnInit } from '@angular/core';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.page.html',
  styleUrls: ['./checklists.page.scss'],
})
export class ChecklistsPage implements OnInit {

  header_titles = [];
  constructor(private offlineStorageService: OfflineStorageService, private authService: AuthService) { 
    for (var i = 0; i < AuthConstants.CHECKLISTS_TITLES.length; i++) {
      this.offlineStorageService.get(AuthConstants.CHECKLISTS_TITLES[i]).then((res) => {
        if (res) {
          console.log(res);
          this.header_titles.push(res.header_title);
        }
        else {
          console.log('nothing as yet!');
        }
      });
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.offlineStorageService.get('last_inserted').then((index) => {
      if (index) {
        console.log(index);
        this.offlineStorageService.get(AuthConstants.CHECKLISTS_TITLES[index]).then((res) => {
          if (res) {
            console.log(res);
            this.header_titles.push(res.header_title);
          }
          else {
            console.log('nothing as yet!');
          }
        });
      }
      else {
        console.log('nothing as yet!');
      }
      this.offlineStorageService.removeStorageItem('last_inserted'); 
    });
  }

  confirmDel(index:number) {
    console.log('confirmed!!!');
    let res = confirm('Delete '+this.header_titles[index]+' CHECKLIST?');
    if (res) {
      this.delList(index);
    }
  }

  cancell() {
    console.log('User canceled delete!');
  }

  delList(index:number) {
    console.log(index);
    // data is stored using list title in OfflineStorageService
    this.offlineStorageService.removeStorageItem(this.header_titles[index]); 
    // list titles are first stored using AuthConstants.CHECKLISTS_TITLES array in OfflineStorageService
    this.offlineStorageService.removeStorageItem(AuthConstants.CHECKLISTS_TITLES[index]); 
    let table_name = this.header_titles[index].replace(/\s/g, "_");
    this.header_titles.pop();
    this.authService.postData('dropTable',table_name).subscribe(
      (res: any) => {
          console.log(res);
          if (!res.error) {
            //this.form.reset();
            //no error encounted
              //this.ionLoader.hideLoader();
              //this.toastService.presentToast(res.msg);
              // Storing the User data.
              /*this.offlineStorageService.store(AuthConstants.AUTH, res.user);
              this.storageService.store(AuthConstants.AUTH, res.user);
              this.router.navigate(['/tabs/home']);*/
          } else {
              //this.ionLoader.hideLoader();
              //this.presentAlert('Login Error',res.msg);
          }
      },
      (error: any) => {
          console.log(error);
          //this.ionLoader.hideLoader();
          //this.presentAlert('Login Error','Please check internet connection!');
          
          }
      );
  }
}
