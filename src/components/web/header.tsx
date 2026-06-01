import Link from "next/link";
import { Store, ShoppingCart } from "lucide-react";

const Header = () => {
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
          <Link href="/cart" className="flex-center hover:text-primary transition-color gap-1 font-medium">
            Cart <ShoppingCart size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
