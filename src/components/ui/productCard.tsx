import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardHeader } from "./card";
import { Product } from "@/store/apis/productsApi";
import { Button } from "./button";
import { Plus, Heart, Star, StarHalf } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, addToCart } from "@/store/slices/userSlice";
import { cn } from "@/lib/utils";

const ProductCard = ({ product }: { product: Product }) => {
  const roundedRating = Math.round(product.rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const halfStars = roundedRating % 1 !== 0 ? 1 : 0;

  const dispatch = useDispatch();

  const isLiked = useSelector((state) => state.user.likes.includes(product.id));
  const cartQuantity = useSelector((state) => state.user.cart.find((item) => item.id === product.id)?.quantity ?? 0);

  const handleLikeToggle = () => {
    if (isLiked) {
      dispatch(removeLike(product.id));
    } else {
      dispatch(addLike(product.id));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, quantity: cartQuantity + 1 }));
  };

  return (
    <Card className="group gap-0 p-0">
      <CardHeader className="bg-muted/50 border-b-foreground/10 relative border-b p-0">
        <Link href={`/products/${product.id}`} className="aspect-video size-full overflow-hidden">
          <Image
            className="size-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
            width={320}
            height={180}
            src={product.thumbnail}
            alt={product.title}
            loading="eager"
          />
        </Link>
        <Button
          onClick={handleLikeToggle}
          variant="outline"
          className={cn(
            "invisible absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100",
            { "text-red-500 hover:text-red-500": isLiked },
          )}
        >
          <Heart className={isLiked ? "fill-current" : ""} />
        </Button>
      </CardHeader>
      <CardDescription className="flex flex-col p-6">
        <Link href={`/products/${product.id}`}>
          <h2 className="text-card-foreground mb-4 line-clamp-1 w-fit text-lg font-medium lg:text-xl">
            {product.title}
          </h2>
        </Link>
        <div className="relative mb-6">
          <div className="text-muted-foreground/25 flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={24} />
            ))}
          </div>
          <div className="text-primary absolute top-0 flex items-center gap-2">
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star key={i} size={24} fill="currentColor" />
            ))}
            {halfStars === 1 && <StarHalf size={24} fill="currentColor" />}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link href={`/products/${product.id}`} className="text-card-foreground text-xl font-bold lg:text-2xl">
            ${product.price}
          </Link>
          <Button onClick={handleAddToCart} variant="outline">
            <Plus />
          </Button>
        </div>
      </CardDescription>
    </Card>
  );
};

export default ProductCard;
