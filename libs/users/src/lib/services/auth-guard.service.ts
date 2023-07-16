import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private localStorageService: LocalstorageService) {}

    canActivate() {
        const token = this.localStorageService.getToken();

        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) {
                return true;
            }
        }
        this.router.navigateByUrl('/login');
        return false;
    }

    private _tokenExpired(expiration: any): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
