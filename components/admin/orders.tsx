import {addToast, Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {Order} from "@/types/order";

import {styles} from '@/style/classes';
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/popover";
import {OrderStatus, PaymentStatus} from "@/types/enums";
import {getAllOrders, updateOrder} from "@/data/orders/order-actions";
import {useOrderStore} from "@/data/orders/order-store";
import {useState} from "react";

export interface OrdersProps {
    orders: Order[]
}

export function Orders(ordersProps: OrdersProps) {
    const setOrders = useOrderStore((state) => state.setOrders);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<PaymentStatus | null>(null);

    const handlePaymentStatusChange = async (orderId: string, newStatus: string) => {
        await updateOrder(orderId, {paymentStatus: newStatus, orderStatus: null})
            .then(() => handleRefreshOrders(paymentStatusFilter));
    }

    const handleOrderStatusChange = async (orderId: string, newStatus: string) => {
        await updateOrder(orderId, {paymentStatus: null, orderStatus: newStatus})
            .then(() => handleRefreshOrders(paymentStatusFilter));
    }

    const handleRefreshOrders = async (paymentFilter: PaymentStatus | null) => {
        try {
            setIsLoading(true);

            const data = await getAllOrders(paymentFilter);
            setOrders(data);

            console.log("Show toast for successful refresh");
            showToast("Success", "Orders refreshed successfully", "success");
        } catch (error) {
            console.error(error);
            showToast("Error", "Failed to refresh orders", "danger");
        } finally {
            // runs on both success AND error
            setIsLoading(false);
        }
    };

    const handleFilterChange = async (newFilter: PaymentStatus | null) => {
        setPaymentStatusFilter(newFilter);
        await handleRefreshOrders(newFilter);
    }

    const showToast = (title: string, message: string, severity: string) => {
        addToast({
            title: title,
            description: message,
            color: severity as "success" | "warning" | "danger",
            timeout: 3000
        })
    }

    const getPaymentStatusColor = (status: PaymentStatus) => {
        console.log("Getting color for status: ", status);
        switch (status as PaymentStatus) {
            case PaymentStatus.PAYED:
                return "bg-green-300";
            case PaymentStatus.PENDING:
                return 'bg-yellow-300';
            case PaymentStatus.DECLINED:
            case PaymentStatus.CANCELLED:
                return 'bg-red-300';
        }
    }

    const getOrderStatusColor = (status: OrderStatus) => {
        switch (status as OrderStatus) {
            case OrderStatus.PENDING:
                return 'bg-yellow-300';
            case OrderStatus.DELIVERED:
                return "bg-green-300";
            case OrderStatus.CANCELLED:
                return 'bg-red-300';
        }
    }

    const paymentStatusContent =  (orderId: string) => (
        <PopoverContent className="w-[240px]">
            {(titleProps) => (
                <div className="px-1 py-2 w-full">
                    <p className="text-small font-bold text-foreground" {...titleProps}>
                        Change status
                    </p>
                    <div className="mt-2 flex flex-col gap-2 w-full">
                        {Object.keys(PaymentStatus)
                            .filter((key) => isNaN(Number(key)))
                            .map((status) => (
                            <Button
                                key={status}
                                onPress={() => handlePaymentStatusChange(orderId, status)}
                            >{status}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </PopoverContent>
    );

    const orderStatusContent =  (orderId: string) => (
        <PopoverContent className="w-[240px]">
            {(titleProps) => (
                <div className="px-1 py-2 w-full">
                    <p className="text-small font-bold text-foreground" {...titleProps}>
                        Change status
                    </p>
                    <div className="mt-2 flex flex-col gap-2 w-full">
                        {Object.keys(OrderStatus)
                            .filter((key) => isNaN(Number(key)))
                            .map((status) => (
                                <Button
                                    key={status}
                                    onPress={() => handleOrderStatusChange(orderId, status)}
                                >{status}
                                </Button>
                            ))}
                    </div>
                </div>
            )}
        </PopoverContent>
    );

    return (
        <div>
            <Button onPress={() => handleFilterChange(PaymentStatus.PAYED)}>
                Only show payed
            </Button>
            <Button onPress={() => handleFilterChange(PaymentStatus.PENDING)}>
                Only show pending
            </Button>
            <Table className={styles.table}>
                <TableHeader className={"border-2 border-red-800"}>
                    <TableColumn className={styles.tableColumn}>CUSTOMER</TableColumn>
                    <TableColumn className={styles.tableColumn}>ORDER</TableColumn>
                    <TableColumn className={styles.tableColumn}>PAYMENT STATUS</TableColumn>
                    <TableColumn className={styles.tableColumn}>ORDER STATUS</TableColumn>
                    <TableColumn className={styles.tableColumn}>ORDER CREATED</TableColumn>
                </TableHeader>
                <TableBody>
                    <>
                    {ordersProps.orders?.map((order: Order) => (
                        <TableRow className={styles.tableRow} key={order.id}>
                            <TableCell className={styles.tableCell}>{order.customer.nickname + ", " + order.customer.phoneNumber}</TableCell>
                            <TableCell className={styles.tableCell}>{order.details.map((detail) => detail.productName).join(", ")}</TableCell>
                            <TableCell className={styles.tableCell}>
                                <Popover>
                                    <PopoverTrigger>
                                            <Button className={"w-full "+getPaymentStatusColor(order.paymentStatus)} variant={"light"}>
                                                {order.paymentStatus}
                                            </Button>
                                    </PopoverTrigger>
                                    {paymentStatusContent(order.id)}
                                </Popover>
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button className={"w-full "+getOrderStatusColor(order.orderStatus)} variant={"light"}>
                                            {order.orderStatus}
                                        </Button>
                                    </PopoverTrigger>
                                    {orderStatusContent(order.id)}
                                </Popover>
                            </TableCell>
                            <TableCell className={styles.tableCell}>{order.created}</TableCell>
                        </TableRow>
                    ))}
                    </>
                    <TableRow className={styles.tableRow + "rounded-2xl shadow shadow-slate-500 shadow-xs"} >
                        <TableCell className={styles.tableCell}>
                            <Button onPress={() => handleRefreshOrders(paymentStatusFilter)} variant={"light"} className={"text-3xl"}>
                                <i className={"fa fa-refresh " + (isLoading ? "animate-spin" : "")} aria-hidden="true"></i>
                            </Button>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                            <></>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                            <></>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                            <></>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                            <></>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}