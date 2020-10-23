import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
postData = {
password: '',
email: '',
name: '',
dueDate:''
};
userForm: FormGroup;
formValid: boolean;

form = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  name: new FormControl('', Validators.required),
  dueDate: new FormControl('', Validators.required)
});

constructor(
private authService: AuthService,
private toastService: ToastService,
private storageService: StorageService,
private router: Router,
public formBuilder: FormBuilder
) {
}

ngOnInit() {}


signupAction() {
  this.postData.email = this.form.get('email').value;
  this.postData.name = this.form.get('name').value;
  this.postData.password = this.form.get('password').value;
  this.postData.dueDate = this.form.get('dueDate').value;
   
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
res.msg
);
}
},
(error: any) => {
this.toastService.presentToast('Network Issue.');
}
);
 
}
}
