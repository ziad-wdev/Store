import CartList from "@/components/web/cart/cartList";
import CartSummary from "@/components/web/cart/cartSummary";
import LikesList from "@/components/web/cart/likesList";

export const dynamic = "force-dynamic";

const CartPage = () => {
  return (
    <>
      <h1 className="bg-accent-foreground text-accent py-16 text-center text-6xl font-medium">Cart</h1>
      <div className="container flex flex-1 flex-col justify-evenly">
        <div className="flex justify-between gap-8 py-16 max-sm:flex-col-reverse">
          <CartList />
          <CartSummary />
        </div>
        <LikesList />
      </div>
    </>
  );
};

export default CartPage;
