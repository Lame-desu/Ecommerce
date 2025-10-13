"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // We won't use built-in arrow components because we place arrows below the pagination
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";

import AutoPlay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

// Example slides (replace img with your public/ paths or CDN)
const SLIDES = [
  {
    id: "suits",
    title: "Men Tshirt",
    category: "mens-shirts",
    subtitle: "We now offer up-to 10 days delivery for Tshirt's",
    img: "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
    href: "/products/categories/mens-shirts",
  },
  {
    id: "mens-shoes",
    title: "mens-shoes",
    category: "mens-shoes",
    subtitle: "New arrivals — premium fabrics and tailoring",
    img: "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/2.webp",
    href: "/products/categories/mens-shoes",
  },
  {
    id: "womens-bags",
    title: "womens-bags",
    category: "womens-bags",
    subtitle: "Complete your look with curated bags",
    img: "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
    href: "/products/categories/womens-bags",
  },
  {
    id: "sports-accessories",
    title: "sports-accessories",
    category: "sports-accessories",
    subtitle: "Bold, sleek, and crafted to keep up with your every moment.",
    img: "https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/1.webp",
    href: "/products/categories/sports-accessories",
  },
  {
    id: "motorcycle",
    title: "motorcycle",
    category: "motorcycle",
    subtitle:
      "The Scooter Motorcycle is a practical and fuel-efficient bike ideal for urban commuting",
    img: "https://cdn.dummyjson.com/product-images/motorcycle/motogp-ci.h1/1.webp",
    href: "/products/categories/motorcycle",
  },
  {
    id: "home-decoration",
    title: "home-decoration",
    category: "home-decoration",
    subtitle:
      "The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance.",
    img: "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp",
    href: "/products/categories/home-decoration",
  },
];

export default function HeroCarousel() {
  // create plugins client-side and memoize them
  const autoplayPlugin = React.useMemo(
    () => AutoPlay({ delay: 4000, stopOnInteraction: false }),
    []
  );
  const wheelPlugin = React.useMemo(() => WheelGesturesPlugin(), []);

  // Embla API reference set by shadcn Carousel via setApi prop
  const emblaApiRef = React.useRef<any | null>(null);

  // pagination state
  const [snapList, setSnapList] = React.useState<number[]>([]);
  const [selected, setSelected] = React.useState(0);

  // receive embla api from shadcn Carousel
  function handleSetApi(apiInstance: any) {
    emblaApiRef.current = apiInstance;
    if (!apiInstance) return;

    // initialize pagination data & listeners
    setSnapList(apiInstance.scrollSnapList());
    setSelected(apiInstance.selectedScrollSnap());

    const onSelect = () => setSelected(apiInstance.selectedScrollSnap());
    apiInstance.on("select", onSelect);
    apiInstance.on("reInit", () => {
      setSnapList(apiInstance.scrollSnapList());
      setSelected(apiInstance.selectedScrollSnap());
    });
  }

  // convenience controls
  const scrollPrev = () =>
    emblaApiRef.current && emblaApiRef.current.scrollPrev();
  const scrollNext = () =>
    emblaApiRef.current && emblaApiRef.current.scrollNext();
  const scrollTo = (idx: number) =>
    emblaApiRef.current && emblaApiRef.current.scrollTo(idx);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Carousel wrapper: full width */}
      <Carousel
        className="w-full"
        // pass embla options; you already used dragFree — keep or tune it
        opts={{
          dragFree: false,
          containScroll: "trimSnaps",
          align: "start",
          duration: 25,
          skipSnaps: true,
          dragThreshold: 30,
        }}
        plugins={[autoplayPlugin, wheelPlugin]}
        setApi={handleSetApi} // <- shadcn wrapper prop to expose embla API
      >
        <CarouselContent>
          {SLIDES.map((s) => (
            <CarouselItem key={s.id}>
              {/* Each slide fills 85vh and full width */}
              <div className="w-full h-[85vh] relative overflow-hidden">
                {/* Background image: Next Image with fill */}
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  style={{ objectFit: "cover" }}
                />

                {/* left-to-right gradient so text readable */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="h-full w-full bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                </div>

                {/* content panel overlayed */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="md:flex md:items-center">
                      <div className="md:w-1/3 text-white py-12 md:py-20">
                        <div className="inline-block rounded bg-white/10 px-3 py-1 text-sm font-semibold mb-4">
                          {s.title}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                          {s.title}
                        </h2>
                        <p className="text-md md:text-lg text-white/90 mb-6">
                          {s.subtitle}
                        </p>
                        <Link
                          href={`/category/${s.category}`}
                          className="inline-block bg-white text-black px-5 py-3 rounded-md font-medium shadow hover:opacity-95 transition"
                        >
                          View All
                        </Link>
                      </div>

                      {/* spacer to visually allow image to appear right on desktop */}
                      <div className="hidden md:block md:flex-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* We won't render the built-in CarouselPrevious/Next because we want arrows at bottom */}
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>

      {/* Controls: bottom center - left arrow, pagination dots, right arrow */}
      <div className="mt-4 flex items-center justify-center gap-4 px-4 mb-3">
        {/* Left arrow */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="p-2 rounded-full bg-white/90 hover:bg-white shadow cursor-pointer"
        >
          {/* simple chevron */}
          <MdOutlineKeyboardArrowLeft />
        </button>

        {/* Pagination dots (center) */}
        <div className="flex items-center gap-3">
          {snapList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-3 h-3 rounded-full transition-transform ${
                idx === selected
                  ? "bg-black scale-110"
                  : "bg-white/60 border-[0.5px] border-black cursor-pointer"
              }`}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="p-2 rounded-full bg-white/90 hover:bg-white shadow cursor-pointer"
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </div>
      <hr />
    </div>
  );
}
