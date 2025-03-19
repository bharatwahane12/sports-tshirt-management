import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderActions } from "./action-types";
import { concatMap, map } from "rxjs";
import { ordersLoaded } from "./orders.actions";
import { OrdersService } from "../services/orders/orders.service";

@Injectable()
export class OrdersEffect {

    loadOrders$ ;
    
    constructor(private actions$: Actions, private ordersService: OrdersService) {
        this.loadOrders$ = createEffect(() => 
            this.actions$.pipe(
                ofType(OrderActions.loadOrders),
                concatMap(action => this.ordersService.getOrders()),
                map((orders: any) => ordersLoaded({orders}))
            ))
    }
}