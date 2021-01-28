import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
providedIn: 'root'
})
export class UserDataResolver {
constructor(private authService: AuthService) {}

resolve() {
console.log('Hello from user data resolver!');
return this.authService.getUserData();
}
}