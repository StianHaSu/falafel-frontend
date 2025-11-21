import {Button, Card, CardBody, CardHeader} from "@heroui/react";
import {CartItem} from "@/types/cart";
import {useCartStore} from "@/data/orders/order-store";


interface CartItemProps {
    item: CartItem
}

export function CartItemRow(cartItem: CartItemProps) {
    const cartStore = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

    const handleIncrease = () => {
        addToCart({name: cartItem.item.name, productId: cartItem.item.productId, quantity: 1, price: cartItem.item.price});
    }

    const handleDecrease = () => {
        decreaseQuantity(cartItem.item.productId);
    }

    return (
        <div className={"max-h-[90vh]"}>
            <Card>
                <CardBody>
                    <div className={"flex-col columns-1 md:columns-3 space-y-3"}>
                        <div className={"col-span-1 col-start-1"}>
                            <p className={"font-bold"}>{cartItem.item.name}</p>
                        </div>
                        <div>
                            <div className={"flex space-x-2"}>
                                <Button className={"text-4xl"} variant={"light"} onPress={handleIncrease}>
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                </Button>
                                <p className={"text-2xl font-bold"}>
                                    {cartStore.filter(item => item.productId === cartItem.item.productId)[0]?.quantity || 0}
                                </p>
                                <Button className={"text-4xl"} variant={"light"} onPress={handleDecrease}>
                                    <i className="fa fa-minus-circle" aria-hidden="true"></i>
                                </Button>
                            </div>
                        </div>
                        <div className={"flex md:justify-end"}>
                            <p>{(cartItem.item.price * cartItem.item.quantity).toFixed(2)}kr</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}