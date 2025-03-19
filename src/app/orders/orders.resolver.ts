import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { finalize, first, Observable, tap } from "rxjs";
import { loadOrders } from "./orders.actions";

@Injectable()
export class OrdersResolver implements Resolve<any> {

    loading = false;

    constructor(private readonly store: Store<any>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            tap(() => {
                if(!this.loading) {
                    this.loading = true;
                    this.store.dispatch(loadOrders());
                }
            }),
            first(),
            finalize(() => this.loading = false)
        );
    }
    
}