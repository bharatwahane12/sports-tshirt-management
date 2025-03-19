import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { OrderDetail } from '../models/order-detail.model';
import { BillGeneratorService } from '../services/bill-generator.service';
import { OrdersService } from '../services/orders.service';
import { OrderFormComponent } from '../order-form/order-form.component';

import { MatButtonModule } from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-order-details-table',
  imports: [
    DatePipe, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatDialogModule, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatMenuModule
  ],
  templateUrl: './order-details-table.component.html',
  styleUrl: './order-details-table.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrderDetailsTableComponent implements AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly dialog = inject(MatDialog);
  billGeneratorService = inject(BillGeneratorService);
  ordersService = inject(OrdersService);

  displayedColumns: string[] = ['Order Number','Customer Name', 'Phone Number', 'Email', 'Address', 'Quantity', 'Ordered Date', 'Delivery Date', 'expand', 'star'];
  dataSource: any;
  expandedOrder: OrderDetail | null | undefined;

  ngAfterViewInit(): void {
    this.ordersService.getOrders().subscribe(orders => {
      this.dataSource = new MatTableDataSource(orders);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(OrderFormComponent, {
      maxWidth: "70vw",
      data: {isEdit: false}
    });
  }
  
  openDialogForEdit(element: OrderDetail) {
    this.dialog.open(OrderFormComponent, {
      maxWidth: "70vw",
      data:{element, isEdit: true},
    });
  }

  generateBill(order: OrderDetail) {
    this.billGeneratorService.generateInvoice(order);
  }

  hasDatePassed(deliveryDate: Date) {
    return (new Date(deliveryDate).valueOf() - new Date().valueOf()) < 0;
  }

  deleteOrder(order: OrderDetail) {
    this.ordersService.deleteOrder(order.orderNumber);
  }
}