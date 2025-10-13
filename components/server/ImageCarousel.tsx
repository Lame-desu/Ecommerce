"use client";

import * as React from "react";
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

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

export default function ImageCarousel({ images }: { images: Array<string> }) {
  // create plugins client-side and memoize them
  const autoplayPlugin = React.useMemo(
    () => AutoPlay({ delay: 4000, stopOnInteraction: true }),
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
    <div className="flex flex-col items-center justify-center">
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
          {images.map((s, indx) => (
            <CarouselItem key={indx}>
              {/* Each slide fills 85vh and full width */}
              <div className="w-full flex justify-center items-center relative overflow-hidden">
                {/* Background image: Next Image with fill */}
                <Image
                  src={s}
                  alt="item picture"
                  width={500}
                  height={500}
                  style={{ objectFit: "cover" }}
                />

                {/* content panel overlayed */}
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
        <div className="flex items-center gap-3 text-sm">
          {selected + 1 + "/" + snapList.length}
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
