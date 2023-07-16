import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    categories: Category[] = [];
    endSubs$: Subject<any> = new Subject();
    isCateogryPage: boolean;
    constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
            params['categoryid'] ? this.isCateogryPage = true : this.isCateogryPage = false;    
        });
        this._getCategories();
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
    }

    private _getProducts(categoriesFilter?: string[]) {
        this.productsService
            .getProducts(categoriesFilter)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((products) => {
                this.products = products;
            });
    }

    private _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => {
                this.categories = categories;
            });
    }

    categoryFilter() {
        const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id);

        this._getProducts(selectedCategories);
    }
}
