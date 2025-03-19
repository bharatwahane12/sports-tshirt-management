import { createReducer, on } from "@ngrx/store";
import { compareOrder, OrderDetail } from "../../models/order-detail.model";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { OrderActions } from "../action-types";

export interface OrdersState extends EntityState<OrderDetail> {
    allOrdersLoaded: boolean
}

export const adapter = createEntityAdapter<OrderDetail>({
    selectId: order => order.orderNumber,
    sortComparer: compareOrder
});

export const initialOrderState = adapter.getInitialState({
    allOrdersLoaded: false
});

export const ordersReducer = createReducer(
    initialOrderState,
    on(OrderActions.ordersLoaded,
        (state: any, action: { orders: OrderDetail[]; }) => adapter.addMany(action.orders, state)
    ),
    on(OrderActions.createOrder,
        (state: any, action: { order: OrderDetail }) => adapter.addOne(action.order, state)
    ),
    on(OrderActions.updateOrder,
        (state: any, action: { order: OrderDetail }) => adapter.updateOne({id: action.order.orderNumber, changes: action.order}, state)
    ),
    on(OrderActions.deleteOrder,
        (state: any, action: { orderNumber: string }) => adapter.removeOne(action.orderNumber, state)
    )
)

export const {
    selectAll
} = adapter.getSelectors();