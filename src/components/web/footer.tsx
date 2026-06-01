import { Store } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-accent-foreground text-accent">
      <div className="container grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="row-span-2 grid grid-rows-subgrid gap-4">
          <h1 className="flex-center w-fit gap-2 text-2xl font-bold">
            <Store size={24} />
            STORE
          </h1>
          <p className="text-muted-foreground text-sm">Your one-stop shop for all your needs.</p>
        </div>
        <div className="row-span-2 grid grid-rows-subgrid gap-4">
          <h2 className="text-lg font-medium">About Us</h2>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm">
            <Link href="/careers" className="hover:text-muted transition-all hover:scale-105">
              Careers
            </Link>
            <Link href="/stores" className="hover:text-muted transition-all hover:scale-105">
              Our Stores
            </Link>
            <Link href="/cares" className="hover:text-muted transition-all hover:scale-105">
              Our Cares
            </Link>
            <Link href="/terms" className="hover:text-muted transition-all hover:scale-105">
              Terms &amp; Conditions
            </Link>
            <Link href="/policy" className="hover:text-muted transition-all hover:scale-105">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="row-span-2 grid grid-rows-subgrid gap-4">
          <h2 className="text-lg font-medium">Customer Care</h2>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm">
            <Link href="/help" className="hover:text-muted transition-all hover:scale-105">
              Help Center
            </Link>
            <Link href="/how-to-buy" className="hover:text-muted transition-all hover:scale-105">
              How to Buy
            </Link>
            <Link href="/track-order" className="hover:text-muted transition-all hover:scale-105">
              Track Your Order
            </Link>
            <Link href="/corporate-bulk" className="hover:text-muted transition-all hover:scale-105">
              Corporate &amp; Bulk Purchases
            </Link>
            <Link href="/returns-refunds" className="hover:text-muted transition-all hover:scale-105">
              Returns &amp; Refunds
            </Link>
          </div>
        </div>
        <div className="row-span-2 grid grid-rows-subgrid gap-4">
          <h2 className="text-lg font-medium">Contact Us</h2>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm">
            <p>70 Washington Square South, New York, NY 10012, USA</p>
            <p>
              Email: <a href="mailto:info@">info@gmail.com</a>
            </p>
            <p>
              Phone: <a href="tel:">+1 123-456-7890</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
