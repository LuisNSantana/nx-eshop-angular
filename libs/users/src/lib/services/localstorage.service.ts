import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';
@Injectable({
    providedIn: 'root'
})
export class LocalstorageService {
    constructor() {}

    setToken(data) {
        localStorage.setItem(TOKEN, data);
    }

    getToken(): string {
        return localStorage.getItem(TOKEN);
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }
    private _tokenExpired(expiration: any): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
    isValidToken(): boolean {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            return !this._tokenExpired(tokenDecode.exp);
        }
        return false;
    }

    getUserIdFromToken(): string {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if (tokenDecode) {
                return tokenDecode.userId;
            } else {
                return null;
            }
        }
        return null;
    }
}
