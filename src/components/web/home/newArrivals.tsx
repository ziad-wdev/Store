"use client";

import { useGetNewArrivalsQuery } from "@/store/apis/productsApi";
import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";

const NewArrivals = () => {
  const { data, isLoading } = useGetNewArrivalsQuery();
  const itemsNumber = 6;
  const showedItems = data?.slice(0, itemsNumber) || [];

  return (
    <section className="bg-muted-foreground/10">
      <div className="container py-16">
        <h2 className="mb-10 text-center text-4xl font-bold">New Arrivals</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: itemsNumber }).map((_, i) => <ProductCardSkeleton key={i} />)
            : showedItems?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
