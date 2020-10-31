import { formatDate } from '@angular/common';
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
selector: 'app-signup',
templateUrl: './signup.page.html',
styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  form: FormGroup;
  // used to set min and max values from type date input in html
  pregnancyMinDate: string;
  pregnancyMaxDate: string;
  postData = {
  password: null,
  email: null,
  name: null,
  dueDate:null
  };

constructor(
private authService: AuthService,private router: Router,private customValidator: CustomvalidationService,
private fb: FormBuilder, private alertCtrl: AlertController,private ionLoader: LoaderService) {}

ngOnInit() {
  this.form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4),trimValidator]],
    email: ['', [Validators.required, Validators.email, trimValidator]],
    password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
    confirmPassword: ['', [Validators.required]],
    dueDate: new FormControl('', Validators.required)
  },
    {
      validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
    }
  );
  let pregnancyDurationInMilliSeconds = 40 * 7 * 24 * 3600 * 1000;
  let dateTodayInMilliSeconds = Date.now();
  this.pregnancyMinDate = formatDate(dateTodayInMilliSeconds, 'yyyy-MM-dd', 'en-ZA');
  this.pregnancyMaxDate = formatDate((dateTodayInMilliSeconds + pregnancyDurationInMilliSeconds), 'yyyy-MM-dd', 'en-ZA');
}

get name() { return this.form.get('name'); }
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

signupAction() {
  //this.ionLoader.showLoader();
  this.postData.email = this.form.get('email').value.trim();
  this.postData.name = this.form.get('name').value.trim();
  this.postData.password = this.form.get('password').value;
  this.postData.dueDate = this.form.get('dueDate').value;
  console.log(this.postData);
  this.authService.signup(this.postData).subscribe(
  (res: any) => {
    if (!res.error) {// no error was encounted
        //this.ionLoader.hideLoader();
        this.presentAlert("Success",res.msg);
        this.router.navigate(['login']);
    }else {
      //this.ionLoader.hideLoader();
      this.presentAlert("Registration Error",res.msg);
    }
  },
  (error: any) => {
    //this.ionLoader.hideLoader();
    this.presentAlert('Connection Error','Please check your internet connection!');
  }
  );}
}