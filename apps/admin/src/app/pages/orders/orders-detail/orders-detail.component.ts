import { Component, OnInit } from '@angular/core';
import { Order, OrdersService, ORDER_STATUS } from '@belctech/orders';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    order: Order[] = [];
    orderStatuses = [];
    selectedStatus: any;
    userName:string;

    constructor(private orderServices: OrdersService, private route: ActivatedRoute, 
      private messageService: MessageService, private router: Router) {}

    ngOnInit(): void {
        this._mapOrderStatus();
        this._getOrder();
        
    }

    private _mapOrderStatus() {
        this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
          return {
            id: key,    
            name: ORDER_STATUS[key].label
          };
        });
      }

    private _getOrder() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.orderServices.getOrder(params['id']).subscribe((order) => {
                    this.order = order;
                    this.selectedStatus = order['status'];
                    this.userName = order['user'].name;
                    console.log('orginal oder', order['status'])
                    console.log('selected status',this.selectedStatus);
                });
            }
        });
    }


    onStatusChange(event) {
        console.log('event', event.value);
        this.orderServices.updateOrder({ status: event.value }, this.order['id']).subscribe({
            next: (order) =>
                this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order status was uptade for ${ORDER_STATUS[order.status].label}` }),
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order status could not be modified' }),
            complete: () => setTimeout(() => this.router.navigate(['/orders']), 1000)
        });
    }

    

 
}
