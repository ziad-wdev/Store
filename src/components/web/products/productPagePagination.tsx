import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductPagePagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageNumber = Number(searchParams.get("page")) || 1;

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

  const handlePageChange = (choosenPageNumber: number) => {
    const targetNumber = Math.min(totalPages, Math.max(1, choosenPageNumber));
    updateParams({ page: targetNumber });
  };

  return (
    <Pagination className="py-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={pageNumber === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={() => handlePageChange(pageNumber - 1)}
          />
        </PaginationItem>
        {Array.from({ length: 5 }).map((_, i) => {
          const startPage = Math.max(1, pageNumber - 2);
          const targetPage = startPage + i;

          if (targetPage > totalPages) return null;

          return (
            <PaginationItem key={targetPage}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(targetPage)}
                isActive={pageNumber === targetPage}
              >
                {targetPage}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {pageNumber > totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={pageNumber === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            onClick={() => handlePageChange(pageNumber + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagePagination;
