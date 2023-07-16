import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLAuth = environment.apiURL + 'users';
    constructor(private http: HttpClient, private token: LocalstorageService, private router: Router) {}

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.apiURLAuth}/login`, { email, password });
    }

    logout(): void {
        this.token.removeToken();
        this.router.navigateByUrl('/login');
    }
}
