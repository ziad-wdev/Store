import HomeCarousel from "@/components/web/home/homeCarousel";
import Services from "@/components/web/home/services";
import Discounts from "@/components/web/home/discounts";
import NewArrivals from "@/components/web/home/newArrivals";
import BestSellers from "@/components/web/home/bestSellers";

const Page = () => {
  return (
    <main>
      <HomeCarousel />
      <Services />
      <Discounts />
      <NewArrivals />
      <BestSellers />
    </main>
  );
};

export default Page;
