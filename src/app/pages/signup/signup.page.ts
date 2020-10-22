import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { strict } from 'assert';
import { stringify } from 'querystring';
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
  //user type checkbox
  public user_type = [
    { val: 'Patron', isChecked: false, color:"primary", text: '' },
    { val: 'Manager', isChecked: false, color:"secondary", text: 'Please enter the place that you manage' },
    { val: 'Hostess', isChecked: false, color:"danger", text: 'Please enter the place that you usually hostess' }
  ];
postData = {
password: '',
email: '',
name: '',
user_type :{
  Patron: {is: false, place: ''}, 
  Manager: {is: false, place: ''}, 
  Hostess: {is: false, place: ''}
}
};
userForm: FormGroup;
formValid: boolean;

form = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  name: new FormControl('', Validators.required)
});

constructor(
private authService: AuthService,
private toastService: ToastService,
private storageService: StorageService,
private router: Router,
public formBuilder: FormBuilder
) {
}

ngOnInit() {
  
  this.form.valueChanges.subscribe(() => {
    this.formValid = this.FormValidate();
  });
  
}

do_sth(index) {
  
  if(!this.user_type[index].isChecked) {
    this.user_type[index].isChecked = true;
    if(this.user_type[index].val !== 'Patron')
      this.form.addControl(this.user_type[index].val , new FormControl('', Validators.required));
  }
  else {
    this.user_type[index].isChecked = false;
    this.form.removeControl(this.user_type[index].val);
  }
  this.formValid = this.FormValidate();
  console.log(this.form.value);
}


FormValidate() {
  let user_type = this.user_type
  return (user_type[0].isChecked || user_type[1].isChecked || user_type[2].isChecked);
}

signupAction() {
  let user_type_str : string = '';
  this.user_type.forEach(user_type => {
    if(user_type.isChecked) {
      if(user_type.val !== 'Patron')
        this.postData.user_type[user_type.val].place = this.form.get(user_type.val).value;
    }
    this.postData.user_type[user_type.val].is = user_type.isChecked;
  });
  user_type_str = user_type_str.slice(0, -2);
  this.postData.email = this.form.get('email').value;
  this.postData.name = this.form.get('name').value;
  this.postData.password = this.form.get('password').value;
   
  console.log(this.postData);
this.authService.signup(this.postData).subscribe(
(res: any) => {
  console.log(res);
if (res.userData) {
// Storing the User data.
this.storageService
.store(AuthConstants.AUTH, res.userData)
.then(res => {
this.router.navigate(['home']);
});
} else {
this.toastService.presentToast(
'Data alreay exists, please enter new details.'
);
}
},
(error: any) => {
this.toastService.presentToast('Network Issue.');
}
);
 
}
}
