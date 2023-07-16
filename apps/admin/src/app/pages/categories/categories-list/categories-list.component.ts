import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@belctech/products';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories: Category[] = [];
    endsubs$: Subject<any> = new Subject();

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }

    ngOnDestroy(): void {
        
        this.endsubs$.complete();
    }
    _getCategories() {
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endsubs$))
            .subscribe((cats) => {
                this.categories = cats;
            });
    }

    updateCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () =>
                this.categoriesService.deleteCategory(categoryId).subscribe({
                    next: () => {
                        this._getCategories(),
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category was deleted successfully' });
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be deleted' })
                }),
            reject: () => ''
        });
    }
}
