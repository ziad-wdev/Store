"use client";

import Link from "next/link";
import { Store, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Header = () => {
  const cart = useSelector((state: RootState) => state.user.cart);

  const cartQuantity = cart.reduce((acc: number, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-background sticky top-0 right-0 left-0 z-50 shadow-sm">
      <div className="container flex justify-between gap-4 py-4">
        <Link href="/" className="flex-center gap-2 text-2xl font-bold">
          <Store size={24} />
          STORE
        </Link>
        <div className="flex-center gap-6">
          <Link href="/" className="hover:text-primary transition-color font-medium">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary transition-color font-medium">
            Products
          </Link>
          <Link
            href="/cart"
            className="flex-center group hover:text-primary transition-color relative gap-1 font-medium"
          >
            Cart <ShoppingCart size={20} />
            {cartQuantity ? (
              <span className="bg-primary text-primary-foreground flex-center absolute -top-2 -right-4 size-6 rounded-full p-1 text-xs transition-all duration-300 group-hover:-top-3">
                {cartQuantity}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
