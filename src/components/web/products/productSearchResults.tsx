"use client";

import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";

import ProductPagePagination from "@/components/web/products/productPagePagination";

import { useGetProductsQuery } from "@/store/apis/productsApi";

type props = {
  category: string;
  search: string;
  page: number;
};

export default function ProductSearchResults({ category, search, page }: props) {
  const { data, isLoading } = useGetProductsQuery({
    category: category,
    search: search,
    page: page,
    limit: 6,
  });

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className="relative container grid grid-cols-2 grid-rows-2 gap-6 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products.length === 0
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} blurred />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)}

        {!isLoading && products.length === 0 ? (
          <h2 className="absolute top-1/2 left-1/2 -translate-1/2 text-3xl font-medium">No Results</h2>
        ) : null}
      </div>

      <ProductPagePagination totalPages={totalPages} />
    </>
  );
}
