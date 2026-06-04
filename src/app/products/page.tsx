import ProductPageSearch from "@/components/web/products/productPageSearch";
import ProductSearchResults from "@/components/web/products/productSearchResults";

type props = {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
};

const ProductSearchPage = async ({ searchParams }: props) => {
  const resolvedParams = await searchParams;

  const category = resolvedParams.category || "";
  const search = resolvedParams.search || "";
  const page = Number(resolvedParams.page) || 1;

  return (
    <>
      <h1 className="bg-accent-foreground text-accent py-16 text-center text-6xl font-medium">Products</h1>
      <ProductPageSearch />

      <ProductSearchResults category={category} search={search} page={page} />
    </>
  );
};

export default ProductSearchPage;
