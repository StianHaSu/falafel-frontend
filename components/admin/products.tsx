'use client';

import {Button, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {Product} from "@/types/product";
import {useEffect, useState} from "react";
import {createNewProduct, deleteProductById, getAllProducts, patchProductById} from "@/data/products/product-actions";
import {useProductStore} from "@/data/products/products-store";
import {PaymentStatus} from "@/types/enums";
import {useAuth} from "@clerk/nextjs";
import {renderEditingRow, renderTableRow} from "@/components/admin/renderTableRow";

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
    const setShadowProducts = useProductStore((state) => state.setShadowProducts);
    const shadowProducts = useProductStore((state) => state.shadowProducts);
    const resetShadowProduct = useProductStore((state) => state.resetShadowProduct);
    const setProductname = useProductStore((state) => state.setProductName);
    const setProductPrice = useProductStore((state) => state.setProductPrice);
    const setProductDescription = useProductStore((state) => state.setProductDescription);
    const setProductCategories = useProductStore((state) => state.setProductCategories);

    const fillProductToEditMap = () => {
        const map = new Map<string, boolean>();
        productsProps.products.forEach((product) => {
            map.set(product.id, false);
        });

        return map
    }

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [isEditingProduct, setIsEditingProduct] = useState<Map<string, boolean>>(fillProductToEditMap());

    const [isLoading, setIsLoading] = useState(false);
    const { getToken } = useAuth();

    function setEditing(productId: string, value: boolean) {
        setIsEditingProduct(prev => {
            const next = new Map(prev);   // clone (important!)
            next.set(productId, value);
            return next;
        });
    }

    const handleCancelEditing = (productId: string) => {
        resetShadowProduct(productId);
        setEditing(productId, false);
    }

    const handleProductUpdate = async (productId: string) => {
        const token = await getToken();
        if (!token) {
            console.error("No auth token found");
            return;
        }

        const shadowProduct = shadowProducts.find(p => p.id === productId);
        console.log("new price: " + shadowProduct?.price);
        await patchProductById(productId, {
            productName: shadowProduct?.name || null,
            productPrice: shadowProduct?.price || null,
            productDescription: shadowProduct?.description || null,
            categoryUpdates: null
        }, token)
            .then(() => getAllProducts())
            .then((data) => {
                updateProductState(data)
            });

        setEditing(productId, false);
    }

    const handleCreateNewProduct = async () => {
        const token = await getToken();

        if (!token) {
            console.error("No auth token found");
            return;
        }

        createNewProduct({
            productName: name,
            productPrice: parseFloat(price),
            productDescription: description
        }, token).then(() => getAllProducts())
            .then((data) => {
                setProducts(data)
            });

        setName("");
        setPrice("");
        setDescription("");
    }

    const handleDeleteProduct = async (id: string) => {
        const token = await getToken();

        if (!token) {
            console.error("No auth token found");
            return;
        }

        deleteProductById(id, token)
            .then(() => getAllProducts())
            .then((data) => {
                setProducts(data)
            });
    }

    const updateProductState = (products: Product[]) => {
        setProducts(products);
        setShadowProducts(products);
    }

    const handleRefreshProducts = () => {
        setIsLoading(true);
        getAllProducts()
            .then((data) => { updateProductState(data) })
            .then(() => setIsLoading(false));
    }

    return (
        <div>
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
                    <>
                    {productsProps.products?.values().map((product: Product) =>
                        isEditingProduct?.get(product.id) ? renderEditingRow(
                            shadowProducts.find(p => p.id === product.id)!,
                                setProductname,
                                setProductPrice,
                                setProductDescription,
                                handleProductUpdate,
                                handleCancelEditing
                            ) : renderTableRow(product, setEditing, handleDeleteProduct)
                    )}
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
        </div>
    );
}