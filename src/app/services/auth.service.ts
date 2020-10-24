import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConstants } from './../config/auth-constants';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
providedIn: 'root'
})
export class AuthService {
userData$ = new BehaviorSubject<any>([]);

constructor(
private httpService: HttpService,
private storageService: StorageService,
private router: Router
) {}

getUserData() {
this.storageService.get(AuthConstants.AUTH).then(res => {
this.userData$.next(res);
});
}

login(postData: any): Observable<any> {
return this.httpService.post('login', postData);
}

signup(postData: any): Observable<any> {
return this.httpService.post('userRegister', postData);
}

getData(serviceName: string): Observable<any> {
    return this.httpService.get(serviceName);
    }

logout() {
this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
this.userData$.next('');
this.router.navigate(['/login']);
});
}
deleteUserFromDB(user: any): Observable<any> {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
    this.userData$.next('');
    });
    return this.httpService.post('delUser', user);
    }
}