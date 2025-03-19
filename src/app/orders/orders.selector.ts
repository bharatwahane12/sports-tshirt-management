import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrdersState } from "./reducers/orders.reducers";
import * as fromOrders from "./reducers/orders.reducers";

export const selectOrdersState = createFeatureSelector<OrdersState>("order");

export const selectAllOrders = createSelector(
    selectOrdersState,
    fromOrders.selectAll
)