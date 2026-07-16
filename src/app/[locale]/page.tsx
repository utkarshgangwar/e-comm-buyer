import Carousel from "@/src/components/Carousel/page";
import Cover from "@/src/components/Cover/Cover";
import GroupCard from "@/src/components/GroupCard/GroupCard";
import { dummyProducts, browsedProducts } from "@/src/DummyData/caraousel";

export default async function Home() {
  return (
    // 1. Wrap your entire view inside the StoreProvider
      <main className="p-4 w-full">
        <Cover />
        <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          <GroupCard title={"Wishlist"} />
          <GroupCard title={"Recently Viewed"} />
          <GroupCard title={"Deals"} />
          <GroupCard title={"Because you bought"} />
        </div>
        <div className="space-y-6 bg-gray-50 min-h-screen py-6">
          {/* 2. These Carousels will now successfully pass along the Redux context down to ProductCards */}
          <Carousel heading="Trending Sports Gear" items={dummyProducts} />
          <Carousel
            heading="New Arrivals"
            items={dummyProducts.slice().reverse()}
          />
          <Carousel heading="Lifestyle" items={dummyProducts} />
          <Carousel heading="Electronics" items={dummyProducts} />
          <Carousel heading="Fitness" items={dummyProducts} />
          <Carousel heading="Home" items={dummyProducts} />
          <Carousel heading="Books" items={dummyProducts} />
          <Carousel
            heading="Your Browsing History"
            items={browsedProducts}
            plainImages={true}
            cardPaddingClass="p-0"
            gapClass="gap-2"
            aspectRatioClass="aspect-[16/9]"
            itemWidthClass="w-[35vw] sm:w-[20vw] md:w-[15vw] lg:w-[10vw]"
          />
        </div>
      </main>
  );
}
