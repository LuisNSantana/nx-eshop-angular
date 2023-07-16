import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import * as countriesLib from 'i18n-iso-countries';

declare const require;

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = environment.apiURL + 'users';

    constructor(private http: HttpClient) {

        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));   
     }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiURLUsers);
    }
    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.apiURLUsers, user);
    }
    deleteUser(userId: string): Observable<any> {
        return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
    }
    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
    }
    //se anade un objeto a un array con object.entries
    getCountries(): { id: string; name: string }[] {
        return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
            console.log(entry);
            return {
                id: entry[0],
                name: entry[1],

                
            };
        });
    }

    getCountry(countryKey: string): string {
        
        const test = countriesLib.getName(countryKey, 'en');
        
        //console.log('test: ',countryKey);

        return test;
    }

    getTotalUsers(): Observable<number> {

        return this.http.get<number>(`${this.apiURLUsers}/get/count`);
    }
   
   
   
}
