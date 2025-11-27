'use client';

import {Button, Input, TableCell, TableRow} from "@heroui/react";
import {styles} from "@/style/classes";
import {Product} from "@/types/product";

export function renderTableRow(
    product: Product,
    setIsEditing: (productId: string, isEditing: boolean) => void,
    handleDeleteProduct: (id: string) => void
) {
    return <TableRow>
        <TableCell className={styles.tableCell}>{product.name}</TableCell>
        <TableCell className={styles.tableCell}>{product.price}</TableCell>
        <TableCell className={styles.tableCell}>{product.description}</TableCell>
        <TableCell className={styles.tableCell}>{product.id}</TableCell>
        <TableCell className={styles.tableCell}>{product.imageUrl}</TableCell>
        <TableCell className={styles.tableCell}>
            <div className={"flex gap-4"}>
                <span className={"text-xl"}>
                    <Button className={"text-3xl"} variant={"light"} onPress={() => setIsEditing(product.id, true)}>
                        <i className="fa fa-pencil-square-o text-gray-400" aria-hidden="true"></i>
                    </Button>
                </span>
                <span className={"text-xl"}>
                    <Button className={"text-3xl"} variant={"light"} onPress={() => handleDeleteProduct(product.id)}>
                        <i className="fa fa-trash-o text-red-600" aria-hidden="true"></i>
                    </Button>
                </span>
            </div>
        </TableCell>
    </TableRow>

}

export function renderEditingRow(
    product: Product,
    setName: (productId: string, name: string) => void,
    setPrice: (productId: string, price: number) => void,
    setDescription: (productId: string, description: string) => void,
    handleProductUpdate: (productId: string) => void,
    handleCancelEdit: (productId: string) => void
) {

    if (product == undefined) {
        console.error("renderEditingRow: product is undefined");
        return <></>;
    }

    return <TableRow>
        <TableCell className={styles.tableCell}>
            <Input isRequired={true} className="max-w-xs" variant="bordered" onValueChange={(change) => setName(product.id, change)} value={product.name} label="Name"/>
        </TableCell>
        <TableCell className={styles.tableCell}>
            <Input isRequired className="max-w-xs" variant="bordered" onValueChange={(change) => setPrice(product.id, parseFloat(change))} value={product.price.toString()} label="Price" type={"number"}/>
        </TableCell>
        <TableCell className={styles.tableCell}>
            <Input isRequired className="max-w-xs" variant="bordered" onValueChange={(change) => setDescription(product.id, change)} value={product.description != null ? product.description : ""} label="Description"/>
        </TableCell>
        <TableCell className={styles.tableCell + " bg-gray-100 rounded-md py-2"}>{product.id}</TableCell>
        <TableCell className={styles.tableCell + " bg-gray-100 rounded-md"}>Not yet supported</TableCell>
        <TableCell className={styles.tableCell}>
            <div className={"flex justify-center gap-4"}>
                <span className={"rounded-md"}>
                        <Button color={"primary"} onPress={() => handleProductUpdate(product.id)}>Save</Button>
                </span>
                <span className={"rounded-md"}>
                        <Button color={"danger"} onPress={() => handleCancelEdit(product.id)}>Cancel</Button>
                </span>
            </div>
        </TableCell>
    </TableRow>
}