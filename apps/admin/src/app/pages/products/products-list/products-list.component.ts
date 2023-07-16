import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@belctech/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products = [];
    productName: string;
    endsubs$: Subject<any> = new Subject();

    constructor(
        private productsService: ProductsService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    ngOnDestroy(): void {
        this.endsubs$.complete();
    }

    private _getProducts() {
        this.productsService
            .getProducts()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    updateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }

    deleteProduct(productId: string) {
        this.productsService.getProduct(productId).subscribe((productName) => {
            this.productName = productName.name;

            this.confirmationService.confirm({
                message: `Are you sure that you want to delete ${this.productName}?`,
                header: 'Delete Product',
                icon: 'pi pi-exclamation-triangle',
                accept: () =>
                    this.productsService.deleteProduct(productId).subscribe({
                        next: () => {
                            this._getProducts(),
                                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product was deleted successfully' });
                        },
                        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product could not be deleted' })
                    }),
                reject: () => ''
            });
        });
    }
}
