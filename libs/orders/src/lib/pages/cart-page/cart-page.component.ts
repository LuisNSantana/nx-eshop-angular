import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemsDetailed: CartItemDetailed[] = [];
    cartCount = 0;
    endSubs$: Subject<any> = new Subject();
    constructor(private router: Router, private cartService: CartService, private orderService: OrdersService) {}

    ngOnInit(): void {
        this._getCartDetails();
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.endSubs$.complete();
    }

    private _getCartDetails() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
            this.cartItemsDetailed = [];
            this.cartCount = cart?.items.length ?? 0;
            cart.items.forEach((cartItem) => {
                this.orderService.getProduct(cartItem.productId).subscribe((Resproduct) => {
                    this.cartItemsDetailed.push({
                        product: Resproduct,
                        quantity: cartItem.quantity
                    });
                });
            });
        });
    }

    backToShop() {
        this.router.navigate(['/products']);
    }
   

    deleteCartItem(cartItem: CartItemDetailed) {
        this.cartService.deleteCartItem(cartItem.product.id);
    }

    updateCartItemQuantity(event, cartItem: CartItemDetailed) {
        this.cartService.setCartItem(
          {
            productId: cartItem.product.id,
            quantity: event.value
          },
          true
        );
      }
}
