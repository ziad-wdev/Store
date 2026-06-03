import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const HomeCarouselSkeleton = () => {
  return (
    <div className="flex-center pointer-events-none container h-full flex-col gap-6 py-16">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="flex justify-between gap-6 max-sm:flex-col-reverse">
            <div className="flex-1">
              <h2 className="skeleton mb-4 line-clamp-1 w-fit text-2xl lg:text-3xl">Product title</h2>
              <p className="skeleton mb-6 max-w-md max-sm:line-clamp-2 lg:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet minus atque fuga, sit fugit repellat ex
                distinctio odit quae repellendus.
              </p>
              <Button className="skeleton">View Product</Button>
            </div>
            <div className="bg-muted aspect-square w-full max-w-md flex-1 overflow-hidden rounded-xl max-sm:aspect-video"></div>
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
