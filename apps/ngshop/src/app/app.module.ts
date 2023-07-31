import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@belctech/products';
import { UiModule } from '@belctech/ui';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@belctech/orders';
import { JwtInterceptor, UsersModule } from '@belctech/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [AppComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }), 
    AccordionModule, 
    BrowserAnimationsModule, 
    ProductsModule, 
    UiModule, 
    HttpClientModule, 
    OrdersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UsersModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
