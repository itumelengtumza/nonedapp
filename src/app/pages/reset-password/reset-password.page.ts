import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from './../../services/auth.service';

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
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  form: FormGroup;
  postData = {
    password: null,
    email: null
  };

  constructor(private authService: AuthService, private router: Router,
    private customValidator: CustomvalidationService, private fb: FormBuilder, 
    private alertCtrl: AlertController, private ionLoader: LoaderService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, trimValidator]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

  get registerFormControl() {
    return this.form.controls;
  }

  async presentAlert(header:string, msg:string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  resetPasswordAction() {
    //this.ionLoader.showLoader();
    this.postData.email = this.form.get('email').value.trim();
    this.postData.password = this.form.get('password').value.trim();
    this.authService.resetPassword(this.postData).subscribe(
      (res: any) => {
        console.log(res);
        if (!res.error) {// no error was encounted
          //this.ionLoader.hideLoader();
          this.presentAlert("Success",res.msg);
          this.router.navigate(['login']);
        }else {
          //this.ionLoader.hideLoader();
          this.presentAlert("Reset Password Error",res.msg);
        }
      },
      (error: any) => {
        //this.ionLoader.hideLoader();
        this.presentAlert('Connection Error','Please check your internet connection!');
      }
    );
  }
}
