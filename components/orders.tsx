import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {Order} from "@/types/order";

import {styles} from '@/style/classes';

export interface OrdersProps {
    orders: Order[]
}

export function Orders(ordersProps: OrdersProps) {

    return (
        <Table className={styles.table}>
            <TableHeader className={"border-2 border-red-800"}>
                <TableColumn className={styles.tableColumn}>CUSTOMER</TableColumn>
                <TableColumn className={styles.tableColumn}>ORDER</TableColumn>
                <TableColumn className={styles.tableColumn}>PAYMENT STATUS</TableColumn>
                <TableColumn className={styles.tableColumn}>ORDER STATUS</TableColumn>
                <TableColumn className={styles.tableColumn}>ORDER CREATED</TableColumn>
            </TableHeader>
            <TableBody>
                {ordersProps.orders?.map((order: Order) => (
                    <TableRow className={styles.tableRow} key={order.id}>
                        <TableCell className={styles.tableCell}>{order.customer.nickname + ", " + order.customer.phoneNumber}</TableCell>
                        <TableCell className={styles.tableCell}>{order.details.map((detail) => detail.productName).join(", ")}</TableCell>
                        <TableCell className={styles.tableCell}>{order.orderStatus}</TableCell>
                        <TableCell className={styles.tableCell}>{order.paymentStatus}</TableCell>
                        <TableCell className={styles.tableCell}>{order.created}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}