import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, ProductsService } from '@belctech/products';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    editMode = false;
    form: FormGroup;
    isSubmitted = false;
    categories = [];
    selectedState: any = null;
    imageDisplay: string | ArrayBuffer;
    currentProductId: string;

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private productsService: ProductsService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._getCategories();
        this._initForm();
        this._checkEditMode();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            image: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            isFeatured: [false]
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categoryList) => {
            //const categoryNames = categoryList.map(category => category.name.toString().trim());
            this.categories = categoryList;
        });
    }

    

    private _addProduct(productData: FormData) {
        
        console.log('que manda productData: ', productData);
        this.productsService.createProduct(productData).subscribe({
            next: (product) => this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is created` }),
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product could not be created' }),
            complete: () => setTimeout(() => this.router.navigate(['/products']), 1500)
        });
    }

    private _updateProduct(productData: FormData) {
        console.log('que id: ',this.currentProductId);
        //console.log('que manda productData: ', productData);
        this.productsService.updateProduct(productData, this.currentProductId).subscribe({
            
            next: (product) => this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is updated` }),
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product could not be updated' }),
            complete: () => setTimeout(() => this.router.navigate(['/products']), 1500),
            
        });
    }


    private _checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentProductId = params['id'];
                this.productsService.getProduct(params['id']).subscribe((product) => {
                    this.productForm['name'].setValue(product['name']);
                    this.productForm['category'].setValue(product['category'].id);
                    this.productForm['brand'].setValue(product['brand']);
                    this.productForm['price'].setValue(product['price']);
                    this.productForm['countInStock'].setValue(product['countInStock']);
                    this.productForm['isFeatured'].setValue(product['isFeatured']);
                    this.productForm['description'].setValue(product['description']);
                    this.productForm['richDescription'].setValue(product['richDescription']);
                    this.imageDisplay = product['image'];
                    this.productForm['image'].setValidators([]);
                    //para poder actualizar el producto, sin tener que andir imagen
                    this.productForm['image'].updateValueAndValidity();
                });
            }
        });
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;

        const productFormData = new FormData();

        //forma optima
        Object.keys(this.productForm).map((key) => {
            productFormData.append(key, this.productForm[key].value);
        });
        if (this.editMode) {
            console.log('pasa aqui');
            this._updateProduct(productFormData);
        } else {
            this._addProduct(productFormData);
        }
    }


    onCancle() {
        return '';
    }

    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            //anadir la imagen al backend
            this.form.patchValue({ image: file });
            this.form.get('image').updateValueAndValidity();
            //file reader funcion del mismo js
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }
    get productForm() {
        return this.form.controls;
    }
}
