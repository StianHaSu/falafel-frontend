export interface Order {
    id: string;
    customer: Customer;
    paymentStatus: string;
    orderStatus: string;
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