import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '@belctech/orders';

@Component({
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product: Product;
    endSubs$: Subject<any> = new Subject();
    quantity = 1;
    constructor(private productService: ProductsService, private route: ActivatedRoute, private cartService: CartService) {}

    ngOnInit(): void {
        //q: por que se usa subscribe?
        //a: porque es un observable
        //q: si pero por que con route.params?
        //a: porque es un observable que se actualiza cada vez que cambia la ruta
        this.route.params.subscribe((params) => {
            if (params['productid']) {
                this._getProduct(params['productid']);
            }
        });
    }
    ngOnDestroy(): void {
        this.endSubs$.complete();
        console.log('destroy');
    }

    private _getProduct(id: string) {
        console.log('get product', id);
        this.productService
            .getProduct(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((product) => {
                this.product = product;
            });
    }
    addProductToCart() {
        const cartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };
        this.cartService.setCartItem(cartItem);
    }
}
