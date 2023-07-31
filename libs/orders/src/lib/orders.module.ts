import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { ordersRoutes } from './lib.routes';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(ordersRoutes), RouterModule, BadgeModule, ToastModule, ButtonModule, InputNumberModule, InputMaskModule, DropdownModule, FormsModule, ReactiveFormsModule,  ReactiveFormsModule, InputTextModule],
    declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouComponent],
    exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent],
    providers: [CartService, MessageService]
})
export class OrdersModule {
    //incializamos el localStorage del cart
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
