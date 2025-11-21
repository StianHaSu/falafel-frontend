import {Card, CardHeader, Image, Divider, CardBody, CardFooter, Link, Button} from "@heroui/react";
import {useCartStore} from "@/data/orders/order-store";
import {CartItemRow} from "@/components/store/cart-item-row";

export function Cart() {
    const cart = useCartStore((state) => state.cart);
    const setShowCart = useCartStore((state) => state.setShowCart);

    return (
        <div>
            <Card className="max-h-[90vh] w-[250px] md:w-[600px] lg:w-[700px]">
                <CardHeader className="flex justify-between items-center px-4 py-2">
                    <Image
                        alt="heroui logo"
                        height={40}
                        radius="sm"
                        src="/falafel-wrap.png"
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">Cart</p>
                    </div>
                    <div className="flex flex-col">
                        <Button className={"text-2xl"} color={"danger"} onPress={() => setShowCart(false)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </Button>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody className={"overflow-y-auto space-y-1"}>
                    <>
                        {cart.map((item) =>
                            <CartItemRow item={item} key={item.productId}/>
                        )}
                    </>
                </CardBody>
                <Divider/>
                <CardBody>
                    <div className="flex justify-between px-4 py-2">
                        <p className="font-bold">Total:</p>
                        <p className="font-bold">
                            {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}kr
                        </p>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button color={"secondary"} variant={"flat"}>Go to payment</Button>
                </CardFooter>
            </Card>
        </div>
    );
}