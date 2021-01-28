import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
  header_title = '';
  trimester_checklist = [];

  constructor(private offlineStorageService: OfflineStorageService, private route: ActivatedRoute) {}

  ngOnInit() {
    //this.offlineStorageService.clear();
    let id = this.route.snapshot.paramMap.get('id');
    this.offlineStorageService.get(AuthConstants.CHECKLISTS_TITLES[id]).then((res) => {
      if (res) {
        console.log(res);
        this.header_title = res.header_title;
        this.trimester_checklist = res.list_data;
        for (let i = 0; i < this.trimester_checklist.length; i++) {
          this.offlineStorageService.get(this.trimester_checklist[i].title).then((res) => {
            if (res) {
              this.trimester_checklist[i].data = res;
              console.log(this.trimester_checklist);
              console.log('From offline storage');
            }
            else {
              //this.getTrimesterChecklist(AuthConstants.TRIMESTER_CHECKLIST[i],i);
              console.log('Nothing As YEt!');
            }
          });
        }
      }
      else {
        console.log('nothing as yet!');
      }
    });
  }
 
}