import { Injectable } from '@angular/core';
import * as ORDERS from '../JSON Data/orders.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDetail } from '../models/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders: OrderDetail[];
  private ordersSubject!: BehaviorSubject<OrderDetail[]>;
  private orders$!: Observable<OrderDetail[]>;

  constructor() {
    this.orders = JSON.parse(JSON.stringify(ORDERS)).default;
    this.ordersSubject = new BehaviorSubject(this.orders);
    this.orders$ = this.ordersSubject.asObservable();
  }

  getOrders() {
    return this.orders$;
  }

  placeOrder(order: OrderDetail) {
    this.orders.unshift(order);
    this.ordersSubject.next(this.orders);
  }

  updateOrder(order: OrderDetail) {
    const index = this.orders.findIndex(item => item.orderNumber === order.orderNumber);
    if (index !== -1) {
      this.orders[index] = order;
      this.ordersSubject.next(this.orders);
    }
  }

  deleteOrder(orderNumber: string) {
    const index = this.orders.findIndex(item => item.orderNumber === orderNumber);
    if (index !== -1) {
      this.orders.splice(index, 1);
      this.ordersSubject.next(this.orders);
    }
  }

  generateOrderNumber() {
    return "ORD#" + (this.orders.length + 1).toString().padStart(6, "0");
  }
}
