import { Component, OnInit } from '@angular/core';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-checklists',
  templateUrl: './checklists.page.html',
  styleUrls: ['./checklists.page.scss'],
})
export class ChecklistsPage implements OnInit {

  header_titles = [];
  constructor(private offlineStorageService: OfflineStorageService) { 
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

}
