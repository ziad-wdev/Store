import { Card, CardDescription, CardHeader } from "./card";
import { Button } from "./button";
import { Plus, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductCardSkeleton = ({ blurred = false }) => {
  return (
    <Card className={cn("group pointer-events-none gap-0 p-0", { "blur-xs": blurred })}>
      <CardHeader className="skeleton border-foreground/10 relative border-b p-0">
        <div className="aspect-video size-full"></div>
        <Button
          variant="outline"
          className="invisible absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100"
          disabled
        >
          <Heart />
        </Button>
      </CardHeader>
      <CardDescription className="flex flex-col p-6">
        <h2 className="skeleton mb-2 w-fit text-lg font-medium select-none lg:text-xl">Product title</h2>
        <div className="mb-4">
          <div className="text-muted-foreground/25 flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={24} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="skeleton text-xl font-bold select-none lg:text-2xl">price</h2>
          <Button variant="outline" disabled>
            <Plus />
          </Button>
        </div>
      </CardDescription>
    </Card>
  );
};

export default ProductCardSkeleton;
