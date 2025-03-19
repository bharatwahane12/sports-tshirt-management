import { createAction, props } from "@ngrx/store";
import { OrderDetail } from "../models/order-detail.model";

export const loadOrders = createAction(
    "[Orders Resolver] Load Orders"
);

export const ordersLoaded = createAction(
    "[Orders Effect] Orders Loaded",
    props<{orders: OrderDetail[]}>()
);

export const createOrder = createAction(
    "[Order Form Dialog] Order Create",
    props<{order: OrderDetail}>()
);

export const updateOrder = createAction(
    "[Order Form Dialog] Order Update",
    props<{order: OrderDetail}>()
);

export const deleteOrder = createAction(
    "[Order Details Table] Order Delete",
    props<{orderNumber: string}>()
);