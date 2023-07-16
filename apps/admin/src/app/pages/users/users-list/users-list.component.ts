import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '@belctech/users';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit {
    users: User[] = [];
    userName: string;
    test: any;

    constructor(
        private usersServices: UsersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    _getUsers() {
        this.usersServices.getUsers().subscribe((users) => {
            this.users = users;
        });
    }

    updateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }

    //acas se pntome el nombnre completo del pais
    getCountryName(countryKey: string) {
        if (countryKey) {
            return this.usersServices.getCountry(countryKey);
        }
    }

   

    deleteUser(userId: string) {
        this.usersServices.getUser(userId).subscribe((userName) => {
            this.userName = userName.name;

            this.confirmationService.confirm({
                message: `Are you sure that you want to delete <b> ${this.userName} </b> ?`,
                header: 'Delete User',
                icon: 'pi pi-exclamation-triangle',
                accept: () =>
                    this.usersServices.deleteUser(userId).subscribe({
                        next: () => {
                            this._getUsers(), this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product was deleted successfully' });
                        },
                        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product could not be deleted' })
                    }),
                reject: () => ''
            });
        });
    }
}
