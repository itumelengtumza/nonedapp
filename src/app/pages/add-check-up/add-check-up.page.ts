import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';
import { CheckupListComponent } from 'src/app/components/checkup-list/checkup-list.component';
import { formatDate } from '@angular/common';
const trimValidator: ValidatorFn = (control: FormControl) => {
  if (control.value !== null) { 
    if (control.value.startsWith(' ')) {
      return {
        'trimError': { value: 'Remove leading whitespace!' }
      };
    }
    if (control.value.endsWith(' ')) {
      return {
        'trimError': { value: 'Remove trailing whitespace!' }
      };
    }
  }
  return null;
};

@Component({
  selector: 'app-add-check-up',
  templateUrl: './add-check-up.page.html',
  styleUrls: ['./add-check-up.page.scss'],
})
export class AddCheckUpPage implements OnInit {
  postData = {
    date: null,
    text_arr: []
};
fromPickList:boolean = true;
form_group_names = ['date','medical_center','Test 1'];
text_names = ['Test 1'];
group = {};
form: FormGroup;
h1_text = '';
offline_data = [];
checklist_page = {
  header_title:'',
  list_data: []
}
  pregnancyMinDate: string;

constructor(private router: Router,private authService: AuthService,private storageService: StorageService,
            private toastService: ToastService, public ionLoader: LoaderService,
            private alertCtrl: AlertController, private route: ActivatedRoute,
            private offlineStorageService: OfflineStorageService, private popoverCtrl: PopoverController) {}

ngOnInit() {
  this.group[this.form_group_names[0]] = new FormControl('', Validators.required);
  this.group[this.form_group_names[1]] = new FormControl('', [Validators.required,trimValidator,Validators.minLength(6)]);
  this.group[this.form_group_names[2]] = new FormControl('', [Validators.required,trimValidator,Validators.minLength(6)]);
  this.form = new FormGroup(this.group);
  /*// printing what u type on top of your view
  for (var i = 0; i < this.form_group_names.length; i++) {
    this.form.get(this.form_group_names[i]).valueChanges.subscribe(val => {
      this.h1_text = val;
    })
  }
  */
  //this.offlineStorageService.removeStorageItem(AuthConstants.CHECKUPS);
  this.offlineStorageService.get(AuthConstants.CHECKUPS).then((res) => {
    if(res) {
      console.log(res);
    }
    
  });
  let dateTodayInMilliSeconds = Date.now();
  this.pregnancyMinDate = formatDate(dateTodayInMilliSeconds, 'yyyy-MM-dd', 'en-ZA');
}

get date() { return this.form.get(this.form_group_names[0]); }
get medical_center() { return this.form.get(this.form_group_names[1]); }
get text() { return this.form.get(this.form_group_names[2]); }



  addRow() {
    let i = this.form_group_names.length;
    let new_text = 'Test ' + (i-1);
    this.form_group_names.push(new_text);
    this.text_names.push(new_text);
    this.group[this.form_group_names[i]] = new FormControl('', [Validators.required,trimValidator,Validators.minLength(6)]);
    this.form = new FormGroup(this.group);
    /*
    this.form.get(this.form_group_names[i]).valueChanges.subscribe(val => {
      this.h1_text = val;
    })
    */
  }

  async showList() {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverCtrl.create({
      component: CheckupListComponent,
      cssClass: 'popover_checkup_list',
      componentProps: {
        site: siteInfo
      }
    });

    popover.onDidDismiss().then((res) => {
      console.log(res.data);
      if(res.data) {
        this.fromPickList = false;
        var i = 0, j = 0;
        while( i < res.data.length) {
          if(this.form.get(this.text_names[j])) {// row already added
            if(this.form.get(this.text_names[j]).value) {
              if(this.form.get(this.text_names[j]).value.trim().length > 0) {// row has text already
                j++;
                continue;// already occupied, move to the next one
              }
              
            }
            else {
              this.form.controls[this.text_names[j]].setValue(res.data[i]);
            }
          }
          else {
            this.addRow();
            this.form.controls[this.text_names[j]].setValue(res.data[i]);
          }
          i++;
        }
      }
    });

    return await popover.present();
    /** Sync event from popover component */

  

  }

  confirmDel(index:number) {
    if (this.form.get(this.text_names[index]).value.trim().length > 0) {
      this.presentAlert('Delete '+this.text_names[index]+'?',
      "Are you sure you want to delete this item!", 'Yes', 'Cancel').then(
        res => {
          if (res == 'ok') {
            this.removeRow(index);
          }
        }
      )
    }
    else {
      this.removeRow(index);
    }

  }

  removeRow(index:number) {
    for(var i = index; i < (this.text_names.length - 1); i++) {
      this.form.controls[this.text_names[i]].setValue(this.form.get(this.text_names[i+1]).value);
    }
    let l = this.text_names.length - 1;
    this.form.removeControl(this.text_names[l]);
    this.form_group_names.pop();
    this.text_names.pop();
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



  createInsert() {
    let checkup = {'date':'', 'med_center_name':'', 'tests':[]};
    let checkups = [];
    let formatedDate = formatDate(this.date.value, 'EEEE, dd MMM yyyy, HH:mm', 'en-ZA');
    this.offlineStorageService.get(AuthConstants.CHECKUPS).then((res) => {
      if (res) {
        console.log(res);
        for(var i = 0; i < res.length; i++) {
          if (res[i].date == formatedDate) {
            this.presentAlert("Duplicate Date and Time",
            "Please delete this checkup from checkups list, before proceding!", 'Ok', 'Cancel').then(
              res => {console.log(res);}
            )
            return;
          }
        }
        checkups = res;
      }
      else {
        console.log('nothing as yet!');
      }
      checkup.date = formatedDate;
      checkup.med_center_name = this.medical_center.value;
      let l = Object.keys(this.form.value).length - 1;
      for(var i = 1; i < l; i++) {
        checkup.tests.push(this.form.value['Test '+i]);
      }
      console.log(checkup);
      checkups.push(checkup);
      this.offlineStorageService.store(AuthConstants.CHECKUPS,checkups);
      this.authService.postData('user_checkups',checkup).subscribe(
        (res: any) => {
            console.log(res);
            if (!res.error) {
              this.form.reset();
              this.router.navigate(['/tabs/tools/check-ups']);
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
            this.presentAlert('Login Error','Please check internet connection!', 'Ok', 'Cancel');
            
            }
        );
    });  
  }
}
