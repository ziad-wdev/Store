import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const HomeCarouselSkeleton = () => {
  return (
    <div className="flex-center pointer-events-none container h-full flex-col gap-6 py-20">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="flex items-center justify-between gap-6">
            <div className="flex h-full flex-col items-start">
              <h2 className="skeleton mb-4 text-2xl lg:text-3xl">Product title</h2>
              <p className="skeleton mb-6 max-w-md lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet minus atque fuga, sit fugit repellat ex
                distinctio odit quae repellendus.
              </p>
              <Button className="skeleton lg:p-6 lg:text-lg">View Product</Button>
            </div>
            <div className="bg-muted skeleton aspect-square w-1/2 max-w-sm overflow-hidden rounded-xl"></div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="flex-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-muted size-2 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default HomeCarouselSkeleton;
