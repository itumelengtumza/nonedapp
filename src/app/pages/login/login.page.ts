import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
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
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    postData = {
        email: null,
        password: null
    };

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email,trimValidator]),
        password: new FormControl('', [Validators.required, this.customValidator.patternValidator()])
    });

    constructor(private router: Router,private authService: AuthService,private storageService: StorageService,
                private toastService: ToastService, public ionLoader: LoaderService,
                private alertCtrl: AlertController,private customValidator: CustomvalidationService,
                private offlineStorageService: OfflineStorageService) {}

    ngOnInit() {}

    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }

    async presentAlert(header:string, msg:string) {
        const alert = await this.alertCtrl.create({
          header: header,
          message: msg,
          buttons: ['OK']
        });
    
        await alert.present();
      }

    loginAction() {
        //this.ionLoader.showLoader();
        this.postData.email = this.form.get('email').value.trim();
        this.postData.password = this.form.get('password').value.trim();
        this.authService.login(this.postData).subscribe(
        (res: any) => {
            console.log(res);
            if (!res.error) {//no error encounted
                //this.ionLoader.hideLoader();
                this.toastService.presentToast(res.msg);
                // Storing the User data.
                this.offlineStorageService.store(AuthConstants.AUTH, res.user);
                this.storageService.store(AuthConstants.AUTH, res.user);
                this.router.navigate(['/tabs/home']);
            } else {
                //this.ionLoader.hideLoader();
                this.presentAlert('Login Error',res.msg);
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
