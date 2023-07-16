import { OrderItem } from "./order-item";
import { User } from '@belctech/users';

export class Order{
    id?:string;
    orderItems?:OrderItem;
    shippingAddress1?:string;
    shippingAddress2?:string;
    city?:string;
    phone?:string;
    status?:number;
    totalPrice?:string;
    user?:User;
    dateOrdered?:string;


}