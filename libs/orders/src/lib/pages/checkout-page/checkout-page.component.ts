import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@belctech/users';
import { OrderItem } from '../../models/order-item';
import { CartService, OrdersService, Order } from '@belctech/orders';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit, OnDestroy {


  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrdersService
  ) {}
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId : string;
  countries = [];
  endSubs$: Subject<any> = new Subject();
  

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
    
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
    
  }

  private _autoFillUserData() {
   this.usersService.observerCurrentUser().pipe(takeUntil(this.endSubs$)).subscribe((user) => {
      console.log('user: ', user);
      if (user) {
        this.userId = user.id;
        this.checkoutFormGroup.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          apartment: user.apartment,
          street: user.street,
          city: user.city,
          country: user.country,
          zip: user.zip
        });
      }
    }
    );
  }
  
  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart = this.cartService.getCart();
    if (cart) {
      this.orderItems = cart.items.map((item) => {
        return {
          product: item.productId,
          quantity: item.quantity
        };
      });
    }
    
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
    const order:Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };  
    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
      error: (error: any) => {
        console.error('Error creating order: ', error);
        // Handle the error here
      }
    });

  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
