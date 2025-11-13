'use client';

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@heroui/react";
import {Product} from "@/types/product";

const styles = {
    table: "rounded-lg max-w-[1200px]",
    tableColumn: "",
    tableRow: "",
    tableCell: "px-4 py-2"
}

interface ProductsProps {
    products: Product[];
}
export function Products(productsProps: ProductsProps) {
    return (
        <Table className={styles.table}>
            <TableHeader className={"border-2 border-red-800"}>
                <TableColumn className={styles.tableColumn}>PRODUCT</TableColumn>
                <TableColumn className={styles.tableColumn}>PRICE</TableColumn>
                <TableColumn className={styles.tableColumn}>DESCRIPTION</TableColumn>
                <TableColumn className={styles.tableColumn}>PRODUCT ID</TableColumn>
                <TableColumn className={styles.tableColumn}>IMAGE</TableColumn>
            </TableHeader>
            <TableBody>
                {productsProps.products?.map((product: Product) => (
                    <TableRow className={styles.tableRow} key={product.id}>
                        <TableCell className={styles.tableCell}>{product.name}</TableCell>
                        <TableCell className={styles.tableCell}>{product.price}</TableCell>
                        <TableCell className={styles.tableCell}>{product.description}</TableCell>
                        <TableCell className={styles.tableCell}>{product.id}</TableCell>
                        <TableCell className={styles.tableCell}>{product.imageUrl}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}