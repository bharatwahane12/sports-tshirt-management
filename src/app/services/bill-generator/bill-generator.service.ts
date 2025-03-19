import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { OrderDetail } from '../../models/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BillGeneratorService {

  private totalAmt!: number;
  private order!: OrderDetail;

  constructor() {}

  generateInvoice(order: OrderDetail) {
    this.order = order;
    this.totalAmt = this.order.quantity * ((this.order && this.order.specificDetails.price) ? +this.order.specificDetails.price : 0);
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('INVOICE', 105, 20, { align: 'center' });

    // Add customer details
    doc.setFontSize(12);
    doc.text(`Customer Name: ${order.customerName}`, 20, 40);
    doc.text(`Order Number: ${order.orderNumber}`, 20, 50);
    doc.text(`Phone Number: ${order.phoneNumber}`, 20, 60);
    doc.text(`Email: ${order.email}`, 20, 70);

    doc.text(`Address: ${order.completeAddress}`, 20, 90);

    // Add customer details
    doc.setFontSize(14);

    let orderedDate = new Date(order.orderedDate);
    let deliveredDate = new Date(order.deliveryDate);
    doc.text(`Ordered Date: ${orderedDate.getDate() + "-" + (orderedDate.getMonth()+1) + "-" + orderedDate.getFullYear()}`, 20, 110);
    doc.text(`Delivery Date: ${deliveredDate.getDate() + "-" + (deliveredDate.getMonth()+1) + "-" + deliveredDate.getFullYear()}`, 20, 120);

    // Add table headers
    doc.text('Shirt Catalogue No', 20, 140);
    doc.text('Color', 70, 140);
    doc.text('Size', 90, 140);
    doc.text('Price', 110, 140);
    doc.text('Quantity', 140, 140);
    doc.text('Total Amount', 170, 140);

    // Add table rows
    doc.text(`${order.specificDetails.catalogueNumber}`, 20, 150);
    doc.text(`${order.specificDetails.color}`, 70, 150);
    doc.text(`${order.specificDetails.sizeOfTShirt}`, 90, 150);
    doc.text(`${order.specificDetails.price}`, 110, 150);
    doc.text(`${order.quantity}`, 140, 150);
    doc.text(`${this.totalAmt}`, 170, 150);

    // Add total
    // doc.text(`Total Amount to be Paid(in words): ${invoiceData.total}`, 140, yPosition + 10);

    // Save the PDF
    doc.save(`INVOICE-${order.orderNumber}.pdf`);
  }
}
