import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';
import { OfflineStorageService } from 'src/app/services/offline-storage.service';

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
  selector: 'app-addchecklist',
  templateUrl: './addchecklist.page.html',
  styleUrls: ['./addchecklist.page.scss'],
})
export class AddchecklistPage implements OnInit {
  postData = {
    checklist_title: null,
    text_arr: []
};
form_group_names = ['checklist_title','Item 1'];
text_names = ['Item 1'];
group = {};
form: FormGroup;
h1_text = '';
offline_data = [];
checklist_page = {
  header_title:'',
  list_data: []
}

constructor(private router: Router,private authService: AuthService,private storageService: StorageService,
            private toastService: ToastService, public ionLoader: LoaderService,
            private alertCtrl: AlertController, private route: ActivatedRoute,
            private offlineStorageService: OfflineStorageService) {}

ngOnInit() {
  this.group[this.form_group_names[0]] = new FormControl('', [Validators.required,trimValidator,Validators.minLength(3)]);
              this.group[this.form_group_names[1]] = new FormControl('', [Validators.required,trimValidator,Validators.minLength(6)]);
              this.form = new FormGroup(this.group);
              for (var i = 0; i < this.form_group_names.length; i++) {
                this.form.get(this.form_group_names[i]).valueChanges.subscribe(val => {
                  this.h1_text = val;
                })
              }
}

get checklist_title() { return this.form.get(this.form_group_names[0]); }
get text() { return this.form.get(this.form_group_names[1]); }

async presentAlert(header:string, msg:string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  addRow() {
    let i = this.form_group_names.length;
    let new_text = 'Item ' + i;
    this.form_group_names.push(new_text);
    this.text_names.push(new_text);
    this.group[this.form_group_names[i]] = new FormControl('', [Validators.required,trimValidator,Validators.minLength(6)]);
    this.form = new FormGroup(this.group);
    this.form.get(this.form_group_names[i]).valueChanges.subscribe(val => {
      this.h1_text = val;
    })
  }

  confirmDel(index:number) {
    if (this.form.get(this.text_names[index]).value.trim().length > 0) {
      let res = confirm('Delete '+this.text_names[index]+'?');
      if (res) {
        this.removeRow(index);
      }
    }
    else {
      this.removeRow(index);
    }
  }

  removeRow(index:number) {
    this.form.removeControl(this.text_names[index]);
    this.form_group_names.splice(index+1,1);
    this.text_names.splice(index,1);
    // this array has one more element than this.text_names array 
    
  }

  createInsert() {
    //this.ionLoader.showLoader();
    let id = this.route.snapshot.paramMap.get('id');
    this.offlineStorageService.store('last_inserted',id); // storage removed after getting back to checklists page
    this.checklist_page.list_data.push({title: this.form.get(this.form_group_names[0]).value});
    this.checklist_page.header_title = this.form.get(this.form_group_names[0]).value;
    this.offlineStorageService.store(AuthConstants.CHECKLISTS_TITLES[id],this.checklist_page);
    for (var i = 0; i < this.text_names.length; i++) {
      this.offline_data.push({id: (i+1), text: this.form.get(this.text_names[i]).value});
    }
    this.offlineStorageService.store(this.checklist_page.list_data[0].title, this.offline_data);
    this.router.navigate(['/tabs/tools/checklists/checklist/'+id]);
    this.authService.postData('create_insert',this.form.value).subscribe(
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
        this.presentAlert('Login Error','Please check internet connection!');
        
        }
    );
  }
}
