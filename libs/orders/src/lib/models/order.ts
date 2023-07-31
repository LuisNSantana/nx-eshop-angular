import { OrderItem } from "./order-item";
import { User } from '@belctech/users';

export class Order{
    id?:string;
    orderItems?:OrderItem[];
    shippingAddress1?:string;
    shippingAddress2?:string;
    city?:string;
    country?:string;
    phone?:string;
    status?:number;
    totalPrice?:string;
    user?:any;
    zip?:string;
    dateOrdered?:string;


}