import { Component } from '@angular/core';
import { OrderDetailsTableComponent } from './order-details-table/order-details-table.component';

@Component({
  selector: 'app-root',
  imports: [OrderDetailsTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sports T-Shirt Management';
}
