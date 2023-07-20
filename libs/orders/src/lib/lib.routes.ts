import { Route } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const ordersRoutes: Route[] = [
    {
        path: 'cart',
        component: CartPageComponent
    }
];
