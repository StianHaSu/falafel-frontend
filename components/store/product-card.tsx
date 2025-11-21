'use client';

import {Button, Card, CardBody, CardHeader, Image} from "@heroui/react";
import {Product} from "@/types/product";
import {useCartStore} from "@/data/orders/order-store";

interface ProductsProps {
    product: Product;
}

export function ProductCard(props: ProductsProps) {
    const cartStore = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

    const handleIncrease = () => {
        addToCart({name: props.product.name, productId: props.product.id, quantity: 1, price: props.product.price});
    }

    const handleDecrease = () => {
        decreaseQuantity(props.product.id);
    }

    return (
        <div>
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-md uppercase font-bold">{props.product.name}</p>
                    <p className="text-sm text-default-900">{props.product.description}</p>
                    <h4 className="font-bold text-large">{props.product.price}kr</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/falafel-wrap.png"
                        width={270}
                    />
                    <div className={"flex justify-center space-x-4"}>
                        <Button className={"text-4xl"} variant={"light"} onPress={handleIncrease}>
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </Button>
                        <p className={"text-2xl font-bold"}>
                            {cartStore.filter(item => item.productId === props.product.id)[0]?.quantity || 0}
                        </p>
                        <Button className={"text-4xl"} variant={"light"} onPress={handleDecrease}>
                            <i className="fa fa-minus-circle" aria-hidden="true"></i>
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}