import { Component, OnInit } from '@angular/core';
import { report } from 'process';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public authUser: any;
  public progress = 0.5;
  days_left: number;
  weeks_preg: number;
  baby_fruit_size: string;
  

  constructor(private auth: AuthService, private offlineStorageService: OfflineStorageService,
     private repo: RepoService) { 
  }

  ngOnInit() {
    this.repo.homeData.subscribe(
      data => { 
        if (data) {
          
          this.days_left = data.days_left;
          this.weeks_preg = data.weeks_preg;
          this.baby_fruit_size = data.baby_fruit_size;
        }
      }
    );
        
    this.auth.postData('getTable','pregnancy_by_weeks').subscribe(
      (res: any) => {
          console.log(res);
          if (!res.error) {
            
            //no error encounted
              //this.ionLoader.hideLoader();
              //this.toastService.presentToast(res.msg);
              // Storing the User data.
              this.offlineStorageService.store(AuthConstants.MOMMY_BABY, res);
              /*this.storageService.store(AuthConstants.AUTH, res.user);
              this.router.navigate(['/tabs/home']);*/
          } else {
              //this.ionLoader.hideLoader();
              //this.presentAlert('Login Error',res.msg);
          }
      },
      (error: any) => {
          console.log(error);
          //this.ionLoader.hideLoader();
          //this.presentAlert('Login Error','Please check internet connection!', 'Ok', 'Cancel');
          
          }
      );
  }
  public increaseProgress(){
    this.progress = this.progress + 0.1; 
  }

}
