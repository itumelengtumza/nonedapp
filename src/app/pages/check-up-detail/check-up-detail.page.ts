import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';

@Component({
  selector: 'app-check-up-detail',
  templateUrl: './check-up-detail.page.html',
  styleUrls: ['./check-up-detail.page.scss'],
})
export class CheckUpDetailPage implements OnInit {

  checkup = null;

  constructor(private route: ActivatedRoute, private offlineStorageService: OfflineStorageService) { }

  ngOnInit() {
    this.offlineStorageService.get(AuthConstants.CHECKUPS).then((res) => {
      if (res) {
        let id = this.route.snapshot.paramMap.get('id');
        this.checkup = res[id];
      }
      else {
        console.log('nothing as yet!');
      }
    });
  }

}
