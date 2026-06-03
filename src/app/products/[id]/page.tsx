import ProductInfo from "@/components/web/products/productInfo";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;

  return <ProductInfo id={Number(id)} />;
};

export default ProductPage;
