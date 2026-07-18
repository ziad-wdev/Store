'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const ProductPagePagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1

  const updateParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value))
      } else {
        params.delete(key)
      }
    })

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handlePageChange = (choosenPage: number) => {
    const targetNumber = Math.min(totalPages, Math.max(1, choosenPage))
    updateParams({ page: targetNumber })
  }

  let startPage = Math.max(1, page - 2)
  const endPage = Math.min(totalPages, startPage + 4)

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4)
  }

  return (
    <Pagination className="py-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            onClick={() => handlePageChange(page - 1)}
          />
        </PaginationItem>
        {startPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
          const targetPage = startPage + i

          return (
            <PaginationItem key={targetPage}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => handlePageChange(targetPage)}
                isActive={page === targetPage}
              >
                {targetPage}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {endPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            onClick={() => handlePageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ProductPagePagination
