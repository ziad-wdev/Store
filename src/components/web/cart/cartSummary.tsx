"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/store/apis/productsApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CartSummary = () => {
  const cart: { product: Product; quantity: number }[] = useSelector((state: RootState) => state.user.cart);

  return (
    <Card className="w-full max-w-md gap-0 p-4">
      <h2 className="text-lg lg:text-xl">Cart Summary</h2>
      <Separator className="my-2"></Separator>
      {cart.length === 0 ? (
        <span className="text-muted-foreground">No items in cart</span>
      ) : (
        <>
          <div className="text-muted-foreground grid grid-cols-[auto_auto_auto_1fr]">
            {cart.map((item, index: number) => (
              <div key={index} className="col-span-4 grid grid-cols-subgrid gap-2 last:mb-2">
                <span>{item.quantity}</span>
                <span>x</span>
                <span>${item.product.price.toFixed(2)}</span>
                <span className="text-right">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md lg:text-lg">Total Price:</span>
            <span className="text-md lg:text-lg">
              ${cart.reduce((acc: number, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>
        </>
      )}
    </Card>
  );
};

export default CartSummary;
