import { Injectable } from '@angular/core';
import * as ORDERS from '../../JSON Data/orders.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDetail } from '../../models/order-detail.model';

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

  generateOrderNumber() {
    return "ORD#" + (this.orders.length + 1).toString().padStart(6, "0");
  }
}
