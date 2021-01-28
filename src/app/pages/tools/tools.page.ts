import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthService } from 'src/app/services/auth.service';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.page.html',
  styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

  table_names = [];
  postData = {
    table_name: null
  };
  checklist_page = {
    header_title:'',
    list_data: []
  }
  
  list_title = ''; /* this will be inputed by the user upon creating a new list, it will appear 
                      on the ion-header title of the list, it will also be used as a str ref for 
                      storing checklist object({title: 'First', data: []}) using OfflineStorageService*/

  constructor(private authService: AuthService, private offlineStorageService: OfflineStorageService, 
    private router: Router) { }

  ngOnInit() {
    //this.offlineStorageService.clear();
    //let id = this.route.snapshot.paramMap.get('id');
    this.offlineStorageService.get(AuthConstants.CHECKLISTS_TITLES[0]).then((res) => {
      if (res) {
        console.log(res); 
      }
      else {
        console.log('Nothing as yet, let\'s fix that!');
        this.checklist_page.list_data.push({title: 'First Trimester'});
        this.checklist_page.list_data.push({title: 'Second Trimester'});
        this.checklist_page.list_data.push({title: 'Third Trimester'});
        this.checklist_page.header_title = 'Week By Week';
        this.offlineStorageService.store(AuthConstants.CHECKLISTS_TITLES[0],this.checklist_page);
        this.table_names = ['first_trimester', 'second_trimester', 'third_trimester'];// as stored from external db
        for (let i = 0; i < this.checklist_page.list_data.length; i++) {
          this.getTrimesterChecklist(this.table_names[i],this.checklist_page.list_data[i].title);
        }
      }
    });
    
  }

  navigateTo(str:string) {
    if (str == 'weight') {
      this.offlineStorageService.get(AuthConstants.INIT_WEIGHT_DATA).then((data) => {
        if (data) {
          this.router.navigate(['/tabs/tools/weight']);
        }
        else {
          this.router.navigate(['/tabs/tools/weight-info/']);
        }
      });
    } else if (str == 'check-ups') {
      this.offlineStorageService.get(AuthConstants.CHECKUPS).then((data) => {
        if (data) {
          this.router.navigate(['/tabs/tools/check-ups']);
        }
        else {
          this.router.navigate(['/tabs/tools/add-check-up/']);
        }
      });
    }
  }

  getTrimesterChecklist(table_name:string, ref_string:string) {
    this.postData.table_name = table_name;
    this.authService.postData('getTrimesterChecklist',this.postData).subscribe(
    (res: any) => {
        if (res) {//data returned
          console.log(res);
          console.log('from external server');
            this.offlineStorageService.store(ref_string, res);
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

}
