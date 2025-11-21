import {OrderStatus, PaymentStatus} from "@/types/enums";

export interface Order {
    id: string;
    customer: Customer;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    created: string;
    details: OrderDetails[];
}

export interface Customer {
    customerId: string;
    nickname: string;
    phoneNumber: string;
}

export interface OrderDetails {
    productId: string;
    productName: string;
    orderId: string;
    quantity: string;
}

export interface PatchOrderRequest {
    paymentStatus: string | null;
    orderStatus: string | null;
}