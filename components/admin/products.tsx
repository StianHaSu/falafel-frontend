'use client';

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button} from "@heroui/react";
import {Product} from "@/types/product";
import {useState} from "react";
import {createNewProduct, getAllProducts, deleteProductById} from "@/data/products/product-actions";
import {useProductStore} from "@/data/products/products-store";

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
    const setProducts = useProductStore((state) => state.setProducts);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [showCreate, setShowCreate] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleCreateNewProduct = () => {
        createNewProduct({
            productName: name,
            productPrice: parseFloat(price),
            productDescription: description
        }).then(() => getAllProducts())
            .then((data) => { setProducts(data) });

        setName("");
        setPrice("");
        setDescription("");
    }

    const handleDeleteProduct = (id: string) => {
        deleteProductById(id)
            .then(() => getAllProducts())
            .then((data) => { setProducts(data) });
    }

    const handleRefreshProducts = () => {
        setIsLoading(true);
        getAllProducts()
            .then((data) => { setProducts(data) })
            .then(() => setIsLoading(false));
    }

    return (
        <Table className={styles.table}>

            <TableHeader className={"border-2 border-red-800"}>
                <TableColumn className={styles.tableColumn}>PRODUCT</TableColumn>
                <TableColumn className={styles.tableColumn}>PRICE</TableColumn>
                <TableColumn className={styles.tableColumn}>DESCRIPTION</TableColumn>
                <TableColumn className={styles.tableColumn}>PRODUCT ID</TableColumn>
                <TableColumn className={styles.tableColumn}>IMAGE</TableColumn>
                <TableColumn className={styles.tableColumn}>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
                <>{productsProps.products?.map((product: Product) => (
                    <TableRow className={styles.tableRow} key={product.id}>
                        <TableCell className={styles.tableCell}>{product.name}</TableCell>
                        <TableCell className={styles.tableCell}>{product.price}</TableCell>
                        <TableCell className={styles.tableCell}>{product.description}</TableCell>
                        <TableCell className={styles.tableCell}>{product.id}</TableCell>
                        <TableCell className={styles.tableCell}>{product.imageUrl}</TableCell>
                        <TableCell className={styles.tableCell}>
                            <div className={"flex gap-4"}>
                                <span className={"text-xl"}>
                                    <i className="fa fa-pencil-square-o text-gray-400" aria-hidden="true"></i>
                                </span>
                                    <span className={"text-xl"}>
                                        <Button onPress={() => handleDeleteProduct(product.id)}>
                                            <i className="fa fa-trash-o text-red-600" aria-hidden="true"></i>
                                        </Button>
                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                </>
                <>
                {showCreate &&
                    <TableRow className={styles.tableRow + " shadow shadow-slate-300 rounded-2xl"} >
                        <TableCell className={styles.tableCell}>
                            <Input isRequired={true} className="max-w-xs" variant="bordered" onValueChange={(change) => setName(change)} value={name} label="Name"/>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                            <Input isRequired className="max-w-xs" variant="bordered" onValueChange={(change) => setPrice(change)} value={price} label="Price" type={"number"}/>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                            <Input isRequired className="max-w-xs" variant="bordered" onValueChange={(change) => setDescription(change)} value={description} label="Description"/>
                        </TableCell>
                        <TableCell className={styles.tableCell + " bg-gray-100 rounded-md py-2"}>Automatically generated</TableCell>
                        <TableCell className={styles.tableCell + " bg-gray-100 rounded-md"}>Not yet supported</TableCell>
                        <TableCell className={styles.tableCell}>
                            <span className={"rounded-md"}>
                                    <Button color={"primary"} onPress={handleCreateNewProduct}>Create product</Button>
                            </span>
                        </TableCell>
                    </TableRow>
                }
                </>
                <TableRow className={styles.tableRow + "rounded-2xl shadow shadow-slate-500 shadow-xs"} >
                    <TableCell className={styles.tableCell}>
                        <Button onPress={handleRefreshProducts} variant={"light"} className={"text-3xl"}>
                            <i className={"fa fa-refresh" + (isLoading ? " animate-spin" : "")} aria-hidden="true"></i>
                        </Button>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                        <Button variant={"light"} className={"text-4xl"}
                                onPress={() => setShowCreate(!showCreate)}>
                            {showCreate ? (<i className={"fa fa-minus-square-o"} aria-hidden="true"></i>) : (
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>)}
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
    );
}