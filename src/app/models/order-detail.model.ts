import { TShirtSpecificDetails } from "./tshirt-specific-details.model";

export interface OrderDetail {
    orderNumber: string;
    customerName: string | null | undefined;
    phoneNumber: string | null | undefined;
    email: string | null | undefined;
    address: Address;
    completeAddress: string | null | undefined;
    quantity: number;
    orderedDate: any;
    deliveryDate: any;
    specificDetails: TShirtSpecificDetails;
}

export interface Address {
    houseNo: string | null | undefined;
    addressLine1: string | null | undefined;
    addressLine2: string | null | undefined;
    city: string | null | undefined;
    state: string | null | undefined;
    pincode: string | null | undefined | number;
}