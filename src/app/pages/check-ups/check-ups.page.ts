import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';

@Component({
  selector: 'app-check-ups',
  templateUrl: './check-ups.page.html',
  styleUrls: ['./check-ups.page.scss'],
})
export class CheckUpsPage implements OnInit {

  checkups = [];
  constructor(private offlineStorageService: OfflineStorageService, private alertCtrl: AlertController, 
    private authService: AuthService) { }

  ngOnInit() {
    this.offlineStorageService.get(AuthConstants.CHECKUPS).then((res) => {
      if (res) {
        this.checkups = res;
      }
      else {
        console.log('nothing as yet!');
      }
      
    });
  }

  async presentAlert(header:string, msg:string, yes_text:string, no_text:string) {
    return new Promise(async (resolve:any) => {
      const alert = await this.alertCtrl.create({
        header: header,
        message: msg,
        buttons: [
          {
            text: no_text,
            role: 'cancel',
            handler: () => { 
              resolve('cancel');
            }
          },
          {
            text: yes_text,
            handler: () => { 
              resolve('ok');
            }
          }
        ]
      });
      await alert.present();
    })
  }

  confirmDel(index:number) {
    this.presentAlert('Delete '+this.checkups[index].date+' checkup ?',
      "Are you sure you want to delete this item!", 'Yes', 'Cancel').then(
        res => {
          if (res == 'ok') {
            this.delList(index);
          }
        }
      )
  }
  

  delList(index:number) {
    console.log(index);
    this.authService.postData('deleteRow',{'table_name': 'user_checkups', 'date': this.checkups[index].date}).subscribe(
      (res: any) => {
          console.log(res);
          if (!res.error) {
            this.checkups.splice(index,1);
            this.offlineStorageService.store(AuthConstants.CHECKUPS, this.checkups);
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
