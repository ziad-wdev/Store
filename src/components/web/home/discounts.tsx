"use client";

import { useGetDiscountsQuery } from "@/store/apis/productsApi";
import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";

const Discounts = () => {
  const { data, isLoading } = useGetDiscountsQuery();
  const itemsNumber = 6;
  const showedItems = data?.slice(0, itemsNumber) || [];

  return (
    <div className="container py-20">
      <h2 className="mb-10 text-center text-4xl font-bold">Big Discounts</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: itemsNumber }).map((_, i) => <ProductCardSkeleton key={i} />)
          : showedItems?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default Discounts;
