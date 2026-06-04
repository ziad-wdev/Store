"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category, useGetCategoryListQuery } from "@/store/apis/productsApi";
import { useEffect, useState } from "react";

const ProductPageSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const [localSearch, setLocalSearch] = useState(search);

  const { data, isLoading }: ReturnType<typeof useGetCategoryListQuery> = useGetCategoryListQuery();

  const updateParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (category: string) => {
    updateParams({ category, page: 1 });
  };

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      if (localSearch !== search) {
        updateParams({ search: localSearch, page: 1 });
      }
    }, 400);

    return () => clearTimeout(searchDebounce);
  }, [localSearch, search]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <div className="flex-center container gap-2 py-8">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button>
              {category ? `Category: ${category}` : "Choose Category"} <ChevronDown />
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="start">
          <DropdownMenuGroup>
            <DropdownMenuRadioGroup value={category} onValueChange={(value) => handleCategoryChange(value)}>
              {isLoading ? (
                <DropdownMenuRadioItem value="loading" disabled>
                  Loading...
                </DropdownMenuRadioItem>
              ) : (
                <>
                  <DropdownMenuRadioItem value="">All Categories</DropdownMenuRadioItem>
                  {data?.map((category: Category) => (
                    <DropdownMenuRadioItem key={category.slug} value={category.slug}>
                      {category.name}
                    </DropdownMenuRadioItem>
                  ))}
                </>
              )}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        type="search"
        placeholder="Search..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  );
};

export default ProductPageSearch;
