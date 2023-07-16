import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{Order, OrdersService} from '@belctech/orders';
import { ORDER_STATUS } from '../order.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent  implements OnInit, OnDestroy {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<any> = new Subject();


  constructor(private ordersService: OrdersService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService){}

  ngOnInit(): void {
     this._getOrders();
  }

  ngOnDestroy(): void {
    
    this.endsubs$.complete();
  }

  _getOrders(){
    this.ordersService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe((orders)=>{
      //const test = orders.map((order)=>{or});
      this.orders = orders;
    })
  }
  showOrder(orderId){
    this.router.navigateByUrl(`/orders/${orderId}`)
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>   this.ordersService.deleteOrder(orderId).subscribe({
        next: () => {
          this._getOrders(),
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order was deleted successfully' })
        },         
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order could not be deleted' })
    }),
      reject: () => ''});
}
}
