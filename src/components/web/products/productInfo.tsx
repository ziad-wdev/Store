"use client";

import { useGetProductByIdQuery, useGetProductsQuery } from "@/store/apis/productsApi";
import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/components/ui/productCard";
import ProductCardSkeleton from "@/components/ui/productCardSkeleton";
import ProductPagePagination from "./productPagePagination";
import { Heart, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, addToCart, updateCartItemQuantity } from "@/store/slices/userSlice";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { useSearchParams } from "next/navigation";

type props = {
  id: number;
};

const ProductInfo = ({ id }: props) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(id);

  const { data: similarProductsData, isLoading: isLoadingSimilarProductsData } = useGetProductsQuery({
    category: product?.category ?? "",
    page,
  });

  const similarProducts = similarProductsData?.products.filter((p) => p.id !== id) ?? [];
  const similarProductsPages = similarProductsData?.totalPages ?? 1;

  const roundedRating = Math.round((product?.rating ?? 0) * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const halfStars = roundedRating % 1 !== 0 ? 1 : 0;

  const isLiked = useSelector((state) => state.user.likes.includes(product?.id));
  const cartQuantity = useSelector((state) => state.user.cart.find((item) => item.id === product?.id)?.quantity ?? 0);
  const [addValue, setAddValue] = useState(1);
  const dispatch = useDispatch();

  const handleLikeToggle = () => {
    if (!product) return;
    if (isLiked) {
      dispatch(removeLike(product.id));
    } else {
      dispatch(addLike(product.id));
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (cartQuantity > 0) {
      dispatch(
        updateCartItemQuantity({
          id: product.id,
          quantity: cartQuantity + addValue,
        }),
      );
    } else {
      dispatch(
        addToCart({
          id: product.id,
          quantity: addValue,
        }),
      );
    }
  };

  return (
    <>
      <div className="container gap-6 py-16">
        <div className="flex justify-between gap-6 max-sm:flex-col">
          {isLoadingProduct ? (
            <>
              <div className="bg-muted aspect-square w-full max-w-md flex-1 overflow-hidden rounded-xl max-sm:aspect-video"></div>
              <div className="flex-1">
                <h2 className="skeleton mb-4 w-fit text-2xl lg:text-3xl">Product title</h2>
                <p className="skeleton mb-6 max-w-md lg:text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet minus atque fuga, sit fugit repellat ex
                  distinctio odit quae repellendus.
                </p>
                <div className="mb-2">
                  <div className="text-muted-foreground/25 flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={24} />
                    ))}
                  </div>
                </div>
                <p className="skeleton mb-6 w-fit text-xl font-bold lg:text-2xl">price</p>
                <div className="flex items-center gap-4">
                  <ButtonGroup>
                    <Button className="skeleton">Add to Cart</Button>
                    <Input
                      key="skeleton-qty"
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="skeleton max-w-24 min-w-0"
                    />
                  </ButtonGroup>
                  <Button variant="outline" className="skeleton">
                    <Heart />
                  </Button>
                </div>
              </div>
            </>
          ) : product ? (
            <>
              <Link
                href={`/products/${id}/overflow`}
                className="bg-muted aspect-square w-full max-w-md flex-1 overflow-hidden rounded-xl max-sm:aspect-video"
              >
                <Image
                  className="size-full object-contain transition-transform duration-300 hover:scale-105"
                  width={500}
                  height={500}
                  src={product.images[0]}
                  alt={product.title}
                  loading="eager"
                />
              </Link>
              <div className="flex-1">
                <h2 className="mb-4 w-fit text-2xl lg:text-3xl">
                  {product.title} <span className="text-muted-foreground text-sm">{product.category}</span>
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md lg:text-lg">{product.description}</p>
                <div className="relative mb-2">
                  <div className="text-muted-foreground/25 flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={24} />
                    ))}
                    <span className="text-muted-foreground text-sm">{product.rating}</span>
                  </div>
                  <div className="text-primary absolute top-0 flex items-center gap-2">
                    {Array.from({ length: fullStars }).map((_, i) => (
                      <Star key={i} size={24} fill="currentColor" />
                    ))}
                    {halfStars === 1 && <StarHalf size={24} />}
                  </div>
                </div>
                <p className="text-card-foreground mb-6 text-xl font-bold lg:text-2xl">${product.price}</p>
                <div className="flex items-center gap-4">
                  <ButtonGroup>
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                    <Input
                      key="real-qty"
                      type="number"
                      min={1}
                      value={addValue}
                      onChange={(e) => setAddValue(Number(e.target.value))}
                      className="max-w-24 min-w-0"
                    />
                  </ButtonGroup>
                  <Button
                    variant="outline"
                    onClick={handleLikeToggle}
                    className={cn({ "text-red-500 hover:text-red-500": isLiked })}
                  >
                    <Heart className={isLiked ? "fill-current" : ""} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-center container flex-1 flex-col py-20">
              <h2 className="text-3xl font-bold">Product Not Found</h2>
              <p className="mb-4 text-lg font-medium">Could not find product with id {id}</p>
              <Link
                href="/products"
                className="text-lg font-medium underline transition-all hover:scale-105 hover:underline-offset-4"
              >
                Return to Products
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <h2 className="mb-10 text-center text-4xl font-bold">You Might Also Like</h2>
        <div className="grid grid-cols-1 grid-rows-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoadingSimilarProductsData
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : similarProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
      <ProductPagePagination totalPages={similarProductsPages} />
    </>
  );
};

export default ProductInfo;
