import CartList from "@/components/web/cart/cartList";
import CartSummary from "@/components/web/cart/cartSummary";
import LikesList from "@/components/web/cart/likesList";

const CartPage = () => {
  return (
    <div className="container">
      <div className="flex justify-between gap-8 py-16 max-sm:flex-col-reverse sm:items-start">
        <CartList />
        <CartSummary />
      </div>
      <LikesList />
    </div>
  );
};

export default CartPage;
