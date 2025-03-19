import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { OrdersEffect } from './orders/orders.effects';
import { OrdersResolver } from './orders/orders.resolver';
import { ordersReducer } from './orders/reducers/orders.reducers';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideStore({order: ordersReducer}), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects(OrdersEffect), OrdersResolver]
};
