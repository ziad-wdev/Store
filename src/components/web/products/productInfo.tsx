"use client";

import { useGetProductByIdQuery } from "@/store/apis/productsApi";

type props = {
  id: string;
};

const ProductInfo = ({ id }: props) => {
  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Product not found.</div>;

  return <div>{data.title}</div>;
};

export default ProductInfo;
