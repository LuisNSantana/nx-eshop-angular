import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ordersRoutes } from './lib.routes';
import { CartService } from './services/cart.service';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ordersRoutes), RouterModule],
    declarations: []
})
export class OrdersModule {
    //incializamos el localStorage del cart
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
