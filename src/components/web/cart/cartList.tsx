'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Minus, Plus, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Card, CardHeader } from '@/components/ui/card'
import { Product } from '@/store/apis/productsApi'
import { addToCart, removeFromCart } from '@/store/slices/userSlice'
import { AppDispatch, RootState } from '@/store/store'

const CardList = () => {
  const cart = useSelector((state: RootState) => state.user.cart)
  const dispatch: AppDispatch = useDispatch()
  const handleRemove = (productId: number, quantity: number) => {
    dispatch(removeFromCart({ productId, quantity }))
    toast.success(`Removed ${quantity} item${quantity !== 1 ? 's' : ''} from cart`)
  }
  const handleIncrease = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }))
    toast.success('Added 1 item to cart!')
  }
  const handleDecrease = (productId: number) => {
    dispatch(removeFromCart({ productId, quantity: 1 }))
    toast.success('Removed 1 item from cart!')
  }

  return (
    <div className="flex w-full flex-col justify-center gap-4">
      {cart.length === 0 ? (
        <p className="text-muted-foreground text-center text-2xl font-medium">Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <Card key={item.product.id} className="grid grid-cols-[auto_1fr] gap-0 p-0">
            <CardHeader className="border-foreground/10 bg-muted aspect-square h-full overflow-hidden rounded-none border-r p-0">
              <Link href={`/products/${item.product.id}`} className="group size-full">
                <Image
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                  width={500}
                  height={500}
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  loading="eager"
                />
              </Link>
            </CardHeader>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center justify-between gap-2">
                <Link href={`/products/${item.product.id}`}>
                  <h3 className="text-lg font-semibold">{item.product.title}</h3>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(item.product.id, item.quantity)}
                >
                  <X />
                </Button>
              </div>
              <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-card-foreground text-lg font-bold lg:text-xl">
                  ${item.product.price}
                </p>
                <ButtonGroup>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDecrease(item.product.id)}
                  >
                    <Minus />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleIncrease(item.product)}>
                    <Plus />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}

export default CardList
