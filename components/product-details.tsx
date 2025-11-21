'use client';

import {useProductStore} from "@/data/products/products-store";
import {Form, Input, Button} from "@heroui/react";
import {useState} from "react";
import {createNewProduct, getAllProducts} from "@/data/products/product-actions";
import {Card, CardHeader, CardBody} from "@heroui/react";

export function ProductDetails() {



    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");


    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 justify-center">
            <div>
                <Card className="py-4 min-w-[250px]">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">Create new Product</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Form onSubmit={() => {}}>
                            <Input isRequired={true} className="max-w-xs" variant="bordered" onValueChange={(change) => setName(change)} value={name} label="Name"/>
                            <Input isRequired className="max-w-xs" variant="bordered" onValueChange={(change) => setPrice(change)} value={price} label="Price" type={"number"}/>
                            <Input isRequired className="max-w-xs" variant="bordered" onValueChange={(change) => setDescription(change)} value={description} label="Description"/>
                            <Button color={"primary"} type={"submit"}>Create product</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}