/* eslint-disable no-prototype-builtins */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '@belctech/products';
import { UsersService } from '@belctech/users';
import { OrdersService } from '@belctech/orders';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    totalUsers: number;
    totalProducts: number;
    totalSales: number;
    totalOrders: number;
    endsubs$: Subject<any> = new Subject();

    constructor(private userService: UsersService, private productService: ProductsService, private orderService: OrdersService) {}

    ngOnInit(): void {
        this.getTotalUsers();
        this.getTotalProducts();
        this.getTotalSales();
        this.getTotalOrders();
    }

    ngOnDestroy(): void {
        this.endsubs$.complete();
    }

    getTotalUsers() {
        this.userService
            .getTotalUsers()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((data: any) => {
                // eslint-disable-next-line no-prototype-builtins
                //convertimos el dato
                if (data.hasOwnProperty('userCount')) {
                    this.totalUsers = Number(data.userCount);
                } else {
                    console.error('Error: Invalid data returned from server');
                }
            });
    }

    getTotalProducts() {
        this.productService
            .getTotalProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((data: any) => {
                // eslint-disable-next-line no-prototype-builtins
                //convertimos el dato
                if (data.hasOwnProperty('productCount')) {
                    this.totalProducts = Number(data.productCount);
                } else {
                    console.error('Error: Invalid data returned from server');
                }
            });
    }

    getTotalSales() {
        this.orderService
            .getTotalSales()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((data: any) => {
                // eslint-disable-next-line no-prototype-builtins
                //convertimos el dato
                if (data.hasOwnProperty('totalsales')) {
                    this.totalSales = Number(data.totalsales);
                } else {
                    console.error('Error: Invalid data returned from server');
                }
            });
    }

    getTotalOrders() {
        this.orderService
            .getTotalOrders()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((data: any) => {
                // eslint-disable-next-line no-prototype-builtins
                //convertimos el dato
                if (data.hasOwnProperty('orderCount')) {
                    this.totalOrders = Number(data.orderCount);
                } else {
                    console.error('Error: Invalid data returned from server');
                }
            });
    }
}
