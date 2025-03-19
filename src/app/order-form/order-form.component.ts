import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { OrderDetail } from '../models/order-detail.model';
import * as CONSTANTS from '../JSON Data/constants.json';
import { OrdersService } from '../services/orders/orders.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createOrder, updateOrder } from '../orders/orders.actions';

@Component({
  selector: 'app-order-form',
  imports: [
    ReactiveFormsModule, 
    DatePipe, 
    MatStepperModule, 
    MatIconModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  private _formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private ordersService = inject(OrdersService);

  isEdit = this.data.isEdit;
  orderDetails: OrderDetail = this.isEdit ? this.data.element : null;
  catalogueNumberWithPrice = JSON.parse(JSON.stringify(CONSTANTS)).default.catalogueNumberWithPrice;
  sizeTShirt = JSON.parse(JSON.stringify(CONSTANTS)).default.sizeTShirt;
  colors = JSON.parse(JSON.stringify(CONSTANTS)).default.colors;
  cityState = JSON.parse(JSON.stringify(CONSTANTS)).default.cityState;

  firstFormGroup = this._formBuilder.group({
    catalogueNumber: [this.isEdit ? this.data.element.specificDetails.catalogueNumber : '', Validators.required],
    price: [this.isEdit ? this.data.element.specificDetails.price : '', [Validators.required]],
    quantity: [this.isEdit ? this.data.element.quantity : '10', Validators.required],
    nameOnTShirt: [this.isEdit ? this.data.element.specificDetails.nameOnTShirt : ''],
    sizeOfTShirt: [this.isEdit ? this.data.element.specificDetails.sizeOfTShirt : '', Validators.required],
    color: [this.isEdit ? this.data.element.specificDetails.color : '', Validators.required],
    printInfoFront: [this.isEdit ? this.data.element.specificDetails.printInfoFront : ''],
    printInfoBack: [this.isEdit ? this.data.element.specificDetails.printInfoBack : ''],
    logoOrDesign: ['']
  });
  secondFormGroup = this._formBuilder.group({
    customerName: [this.isEdit ? this.data.element.customerName : '', Validators.required],
    phoneNumber: [this.isEdit ? this.data.element.phoneNumber : '', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    email: [this.isEdit ? this.data.element.email : '', [Validators.required, Validators.email]],
    hno: [this.isEdit ? this.data.element.address.houseNo : '', Validators.required],
    addressLine1: [this.isEdit ? this.data.element.address.addressLine1 : '', Validators.required],
    addressLine2: [this.isEdit ? this.data.element.address.addressLine2 : '', Validators.required],
    city: [this.isEdit ? this.data.element.address.city : '', Validators.required],
    state: [this.isEdit ? this.data.element.address.state : '', Validators.required],
    pincode: [this.isEdit ? this.data.element.address.pincode : '', Validators.required],
  });

  constructor(private store: Store) { }

  updatePrice(event: any) {
    this.firstFormGroup.patchValue({
      price: this.catalogueNumberWithPrice.find((each: any) => each.cNo === event.value)?.price.toFixed(2).toString()
    });
    this.firstFormGroup.patchValue({
      catalogueNumber: event.value
    });
  }

  onFileSelected(event: any) {
    console.log(event);
  }

  changeColor(event: any) {
    this.firstFormGroup.patchValue({
      color: event.value
    });
  }

  changeSize(event: any) {
    this.firstFormGroup.patchValue({
      sizeOfTShirt: event.value
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  placeOrder() {
    this.orderDetails = this.getUpdatedOrderDetailsValue(this.firstFormGroup.value, this.secondFormGroup.value);

    if(!this.isEdit) {
      this.store.dispatch(createOrder({order: this.orderDetails}));
    } else {
      this.store.dispatch(updateOrder({order: this.orderDetails}));
    }
  }

  calculateDeliveryDate() {
    let date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }

  getUpdatedOrderDetailsValue(tshirtDetails: any, customerDetails: any) {
    return {
      orderNumber: this.isEdit ? this.orderDetails.orderNumber : this.ordersService.generateOrderNumber(),
      customerName: customerDetails.customerName,
      phoneNumber: customerDetails.phoneNumber,
      email: customerDetails.email,
      address: {
        houseNo: customerDetails.hno,
        addressLine1: customerDetails.addressLine1,
        addressLine2: customerDetails.addressLine2,
        city: customerDetails.city,
        state: customerDetails.state,
        pincode: customerDetails.pincode
      },
      completeAddress: customerDetails.hno + ", " + customerDetails.addressLine1 + ", " + customerDetails.addressLine2 + ", " + customerDetails.city + ", " + customerDetails.state + ". " + customerDetails.pincode,
      quantity: tshirtDetails.quantity ? +tshirtDetails.quantity : 0,
      orderedDate:  this.isEdit ? this.orderDetails.orderedDate : new Date(),
      deliveryDate:  this.isEdit ? this.orderDetails.deliveryDate : this.calculateDeliveryDate(),
      specificDetails: {
        nameOnTShirt: tshirtDetails.nameOnTShirt,
        sizeOfTShirt: tshirtDetails.sizeOfTShirt,
        color: tshirtDetails.color,
        printInfoFront: tshirtDetails.printInfoFront,
        printInfoBack: tshirtDetails.printInfoBack,
        logoOrDesign: tshirtDetails.logoOrDesign,
        catalogueNumber: tshirtDetails.catalogueNumber,
        price: tshirtDetails.price
      }
    };
  }
}
