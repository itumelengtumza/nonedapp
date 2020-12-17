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
        
    this.offlineStorageService.get(AuthConstants.AUTH).then((val) => {
      console.log(val);
    });
  }
  public increaseProgress(){
    this.progress = this.progress + 0.1; 
  }

}
