import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from '@belctech/users';
import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';

declare const require;

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent implements OnInit {
    editMode = false;
    isSubmitted = false;
    form: FormGroup;
    currentUserId: string;
    countries = [];

    constructor(
        private formBuilder: FormBuilder,
        private usersServices: UsersService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: [''],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: ['', Validators.required]
        });

        this.usersServices;
        this._checkEditMode();
        this._getCountries();
    }

    onSubmit() {
        const user: User = {
            id: this.currentUserId,
            name: this.userForm['name'].value,
            email: this.userForm['email'].value,
            isAdmin: this.userForm['isAdmin'].value,
            country: this.userForm['country'].value,
            phone: this.userForm['phone'].value,
            street: this.userForm['street'].value,
            zip: this.userForm['zip'].value,
            city: this.userForm['city'].value,
            password: this.userForm['password'].value
        };
        if (this.editMode) {
            this._updateUser(user);
        } else {
            this._addUser(user);
        }
        this.isSubmitted = true;
    }

    private _getCountries() {
     this.countries = this.usersServices.getCountries();
    }
    private _addUser(user: User) {
        this.usersServices.createUser(user).subscribe({
            next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is created' }),
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User could not be created' }),
            complete: () => setTimeout(() => this.router.navigate(['/users']), 1500)
        });
    }

    private _updateUser(user: User) {
        this.usersServices.updateUser(user).subscribe({
            next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is updated' }),
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User could not be updated' }),
            complete: () => setTimeout(() => this.router.navigate(['/users']), 1500)
        });
    }

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentUserId = params['id'];
                this.usersServices.getUser(params['id']).subscribe((user) => {
                    this.userForm['name'].setValue(user['name']);
                    this.userForm['email'].setValue(user['email']);
                    this.userForm['phone'].setValue(user['phone']);
                    this.userForm['isAdmin'].setValue(user['isAdmin']);
                    this.userForm['country'].setValue(user['country']);
                    this.userForm['street'].setValue(user['street']);
                    this.userForm['apartment'].setValue(user['apartment']);
                    this.userForm['zip'].setValue(user['zip']);
                    this.userForm['city'].setValue(user['city']);

                    this.userForm['password'].setValidators([]);
                    this.userForm['password'].updateValueAndValidity;
                });
            }
        });
    }

    get userForm() {
        return this.form.controls;
    }
    goBack() {
        return this.router.navigate(['/users']);
    }
}
