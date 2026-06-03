"use client";

import { useGetBestSellersQuery } from "@/store/apis/productsApi";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import HomeCarouselSkeleton from "@/components/ui/homeCarouselSkeleton";

const HomeCarousel = () => {
  const { data, isLoading } = useGetBestSellersQuery();
  const itemsNumber = 5;
  const carouselItems = data?.slice(0, itemsNumber) || [];

  const plugin = useRef(Autoplay({ delay: 5000 }));
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="h-[65vh] sm:h-[75vh]">
      {isLoading ? (
        <HomeCarouselSkeleton />
      ) : (
        <div className="flex-center container h-full flex-col gap-6 py-16">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
            className="w-full"
            opts={{ loop: true }}
          >
            <CarouselContent>
              {carouselItems.map((product) => (
                <CarouselItem key={product.id} className="flex justify-between gap-6 max-sm:flex-col-reverse">
                  <div className="flex-1">
                    <h2 className="mb-4 line-clamp-1 w-fit text-2xl lg:text-3xl">{product.title}</h2>
                    <p className="text-muted-foreground mb-6 max-w-md max-sm:line-clamp-2 lg:text-lg">
                      {product.description}
                    </p>
                    <Link href={`/products/${product.id}`}>
                      <Button>View Product</Button>
                    </Link>
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className="bg-muted aspect-square w-full max-w-md flex-1 overflow-hidden rounded-xl max-sm:aspect-video"
                  >
                    <Image
                      className="size-full object-contain transition-transform duration-300 hover:scale-105"
                      width={500}
                      height={500}
                      src={product.thumbnail}
                      alt={product.title}
                      loading="eager"
                    />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex-center gap-2">
            {carouselItems.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn("bg-muted size-2 rounded-full", { "bg-primary": i === current - 1 })}
              ></button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeCarousel;
