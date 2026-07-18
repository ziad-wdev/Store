'use client'

import { useSearchParams } from 'next/navigation'

import { useSelector } from 'react-redux'

import ProductCard from '@/components/ui/productCard'
import { RootState } from '@/store/store'

import ProductPagePagination from '../products/productPagePagination'

const LikesList = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const likes = useSelector((state: RootState) => state.user.likes)

  const likesPerPage = 6
  const startIndex = Math.max(0, (page - 1) * likesPerPage)
  const endIndex = Math.min(startIndex + likesPerPage, likes.length)
  const paginatedLikes = likes.slice(startIndex, endIndex)

  return (
    <div>
      <h2 className="mb-10 text-center text-4xl font-bold">Your Liked Products</h2>
      {likes.length === 0 ? (
        <p className="text-muted-foreground pb-16 text-center text-2xl font-medium">
          You haven&apos;t liked any products yet
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 grid-rows-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedLikes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <ProductPagePagination totalPages={Math.ceil(likes.length / likesPerPage)} />
        </>
      )}
    </div>
  )
}

export default LikesList
