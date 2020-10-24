import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { AuthConstants } from './../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';

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
password: '',
email: '',
name: '',
dueDate:''
};

constructor(
private authService: AuthService,
private toastService: ToastService,
private router: Router,
private customValidator: CustomvalidationService,
private fb: FormBuilder,
) {
}

ngOnInit() {
  this.form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
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
  this.pregnancyMaxDate = formatDate((dateTodayInMilliSeconds + pregnancyDurationInMilliSeconds), 
                                      'yyyy-MM-dd', 'en-ZA');
}

get name() { return this.form.get('name'); }
get email() { return this.form.get('email'); }
get password() { return this.form.get('password'); }
get confirmPassword() { return this.form.get('confirmPassword'); }

get registerFormControl() {
  return this.form.controls;
}

signupAction() {
  this.postData.email = this.form.get('email').value.trim();
  this.postData.name = this.form.get('name').value.trim();
  this.postData.password = this.form.get('password').value.trim();
  this.postData.dueDate = this.form.get('dueDate').value;
    
  /*if (this.form.valid) {
    console.log("Form Submitted!");
    this.form.reset();
  }*/
  this.authService.signup(this.postData).subscribe(
  (res: any) => {
    this.toastService.presentToast(res.msg);
    if (!res.error) {// no error was encounted
        this.form.reset();
        this.router.navigate(['login']);
    }
  },
  (error: any) => {
      this.toastService.presentToast('Network Issue.');
  }
  );}
}
