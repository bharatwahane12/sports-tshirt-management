import { Routes } from '@angular/router';
import { OrderDetailsTableComponent } from './order-details-table/order-details-table.component';
import { OrdersResolver } from './orders/orders.resolver';

export const routes: Routes = [
    {
        path: 'orders',
        component: OrderDetailsTableComponent,
        resolve: {
            orders: OrdersResolver
        }
    },
    {
        path: '**',
        redirectTo: 'orders'
    }
];
