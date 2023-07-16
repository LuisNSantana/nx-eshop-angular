import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@belctech/products';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form: FormGroup;
    isSubmitted = false;
    editMode = false;
    currentCategoryId: string;

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            icon: ['', Validators.required],
            color:['#ffffff']
        });
        this.categoriesService;
        this._checkEditMode();
    }

    onSubmit() {
        const category: Category = {
            id:this.currentCategoryId,
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            color: this.categoryForm['color'].value

        };
        if(this.editMode){
            this._updateCategory(category);
        }else{
            this._addCategory(category);
        }
        this.isSubmitted = true;
       
    }

    private _updateCategory(category: Category){
      this.categoriesService.updateCategory(category).subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is updated' }),
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be updated' }),
        complete: () => setTimeout(() => this.router.navigate(['/categories']), 1500)}
    )
    }

    private _addCategory(category: Category){
      this.categoriesService.createCategory(category).subscribe({
        next: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is created' }),
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category could not be created' }),
        complete: () => setTimeout(() => this.router.navigate(['/categories']), 1500)}
    )}

    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentCategoryId = params['id'];
                this.categoriesService.getCategory(params['id']).subscribe((category) => {
                    this.categoryForm['name'].setValue(category['name']);
                    this.categoryForm['icon'].setValue(category['icon']);
                    this.categoryForm['color'].setValue(category['color']);
                });
            }
        });
    }
    get categoryForm() {
        return this.form.controls;
    }

    goBack(){
        return this.router.navigate(['/categories'])
    }
}
