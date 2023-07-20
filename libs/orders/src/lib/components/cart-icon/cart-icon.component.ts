import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html',
    styles: []
})
export class CartIconComponent implements OnInit {
    cartCount = 0;
    constructor(private cartService: CartService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.cartService.cart$.subscribe({
            next: (cart) => {
                //asi le digo que si no hay cart, que me devuelva 0
                this.cartCount = cart?.items.length ?? 0;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product was added to cart', life: 500 });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product could not be added to cart' });
            }
        });
    }
}
