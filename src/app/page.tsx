import BestSellers from '@/components/web/home/bestSellers'
import Discounts from '@/components/web/home/discounts'
import HomeCarousel from '@/components/web/home/homeCarousel'
import NewArrivals from '@/components/web/home/newArrivals'
import Services from '@/components/web/home/services'

const Page = () => {
  return (
    <main>
      <HomeCarousel />
      <Services />
      <Discounts />
      <NewArrivals />
      <BestSellers />
    </main>
  )
}

export default Page
