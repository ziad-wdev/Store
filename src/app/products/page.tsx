"use client";

import ProductPageSearch from "@/components/web/products/productPageSearch";
import ProductPagePagination from "@/components/web/products/productPagePagination";

import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";

import { useSearchParams } from "next/navigation";
import { useGetProductsQuery } from "@/store/apis/productsApi";

const ProductsPage = () => {
  const searchParams = useSearchParams();

  const choosenCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useGetProductsQuery({
    category: choosenCategory,
    search: searchQuery,
    page: pageNumber,
    limit: 6,
  });

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <main>
      <h1 className="bg-accent-foreground text-accent py-20 text-center text-6xl font-medium">Products</h1>
      <ProductPageSearch />

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
    </main>
  );
};

export default ProductsPage;
