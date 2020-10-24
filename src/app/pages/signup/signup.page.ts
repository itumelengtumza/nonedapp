import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  
postData = {
password: '',
email: '',
name: '',
dueDate:''
};

form = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  name: new FormControl('', Validators.required),
  dueDate: new FormControl('', Validators.required)
});

constructor(
private authService: AuthService,
private toastService: ToastService,
private router: Router
) {
}

ngOnInit() {}


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
    );
  }
}
