import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController } from '@ionic/angular';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    postData = {
        email: '',
        password: ''
    };

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, this.customValidator.patternValidator()])
    });

    constructor(private router: Router,private authService: AuthService,private storageService: StorageService,
                private toastService: ToastService,private spinner: NgxSpinnerService, 
                private alertCtrl: AlertController,private customValidator: CustomvalidationService) {}

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
        this.spinner.show();
        this.postData.email = this.form.get('email').value.trim();
        this.postData.password = this.form.get('password').value.trim();
        this.authService.login(this.postData).subscribe(
        (res: any) => {
            console.log(res);
            if (!res.error) {//no error encounted
                this.toastService.presentToast(res.msg);
                this.spinner.hide();
                // Storing the User data.
                this.storageService.store(AuthConstants.AUTH, res.user);
                this.router.navigate(['/home']);
            } else {
                this.spinner.hide();
                this.presentAlert('Login Error',res.msg)
            }
        },
        (error: any) => {
            this.spinner.hide();
            console.log(error);
            this.presentAlert('Login Error','Please check internet connection!')
            }
        );

    }
}
