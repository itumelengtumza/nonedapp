import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

constructor(
private router: Router,
private authService: AuthService,
private storageService: StorageService,
private toastService: ToastService
) {}

ngOnInit() {}

    loginAction() {
        this.postData.email = this.form.get('email').value.trim();
        this.postData.password = this.form.get('password').value.trim();
        /*if (this.form.valid) {
            console.log("Login form Submitted!");
            this.form.reset();
        }*/
        this.authService.login(this.postData).subscribe(
        (res: any) => {
            console.log(res);
            if (!res.error) {//no error encounted
                this.form.reset();
                // Storing the User data.
                this.storageService.store(AuthConstants.AUTH, res.user);
                this.router.navigate(['/home']);
            } else {
                this.toastService.presentToast(res.msg);
            }
        },
        (error: any) => {
            this.toastService.presentToast('Network Issue.');
            }
        );

    }
}
