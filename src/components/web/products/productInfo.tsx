"use client";

import Image from "next/image";
import { useGetProductByIdQuery } from "@/store/apis/productsApi";

import ProductSearchResults from "./productSearchResults";

type props = {
  id: string;
};

const ProductInfo = ({ id }: props) => {
  const { data, isLoading } = useGetProductByIdQuery(id);

  const category = data?.category ?? "";

  return (
    <>
      <div className="flex-center container gap-6 py-20">
        {data && <Image width={500} height={500} src={data.images[0]} alt={data.title} loading="eager" />}
      </div>

      <ProductSearchResults category={category} />
    </>
  );
};

export default ProductInfo;
