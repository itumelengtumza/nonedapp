import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';

@Component({
  selector: 'app-pregnancy-by-weeks',
  templateUrl: './pregnancy-by-weeks.page.html',
  styleUrls: ['./pregnancy-by-weeks.page.scss'],
})
export class PregnancyByWeeksPage implements OnInit {

  mom_or_baby = null;
  preg_details = {'text': null, 'weekly_tip': null};
  weeks_preg = 2;
  constructor(private offlineStorageService: OfflineStorageService, private alertCtrl: AlertController, 
    private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.offlineStorageService.get(AuthConstants.MOMMY_BABY).then((res) => {
      if (res) {
        this.mom_or_baby = this.route.snapshot.paramMap.get('mom_baby');
        this.preg_details.text = res[this.weeks_preg-1][this.mom_or_baby];
        if (this.mom_or_baby == 'mommy') {
          this.preg_details.weekly_tip = res[this.weeks_preg-1].weekly_tip;
        }
      }
      else {
        console.log('nothing as yet!');
      }
      
    });
  }

}
