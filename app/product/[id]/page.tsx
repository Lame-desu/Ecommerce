import ImageCarousel from "@/components/server/ImageCarousel";
import axios from "axios";
import Image from "next/image";
import clsx from "clsx";
import Rating from "@mui/material/Rating";
import ShowReviews from "@/components/client/ShowReviews";
import Category from "@/components/server/Category";

import QuantityButton from "@/components/client/QuantityButton";
import OrderDialog from "@/components/client/OrderDialog";

async function page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  const item = res.data;
  const images: string[] = item.images;
  return (
    <>
      <div>
        <OrderDialog />
      </div>
      <div className="flex justify-center items-center mt-14">
        <div className="w-[90vw] md:w-[75vw] space-y-48">
          <div className="flex justify-center flex-col md:flex-row">
            <div className="flex-2">
              <div className="md:hidden">
                <ImageCarousel images={images} />
              </div>
              <div className="hidden md:block">
                <div className="flex flex-col gap-2 justify-center items-center md:grid grid-cols-2">
                  {images.map((img, indx) => (
                    <Image
                      key={indx}
                      src={img}
                      alt={item.title}
                      width={500}
                      height={500}
                      style={{ objectFit: "cover" }}
                      className={clsx(
                        "w-full h-auto",
                        indx === 0 && "md:col-span-2 md:col-start-1"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 self-start pt-4 space-y-5">
              <h1 className="text-4xl font-normal">{item.title}</h1>
              <p className="text-xl  text-gray-900 font-normal">
                Br{Number((item.price * 100).toFixed(2)).toLocaleString()} ETB
              </p>
              <div>
                <QuantityButton item={item} />
              </div>

              <div>
                <p className="text-[#404040]">{item.description}</p>
              </div>
              <div className="space-y-1">
                <p className="font-normal">Rating</p>
                <div className="flex justify-start items-center gap-2">
                  <Rating
                    name="read-only"
                    value={item.rating}
                    precision={0.1}
                    readOnly
                  />
                  <span>{item.rating}</span>
                </div>
              </div>
              <div className="space-y-4 pt-3">
                <h2 className="text-2xl text-center">Customer Reviews</h2>
                {/* <ReviewsClient initialReviews={item.reviews} /> */}

                <ShowReviews reviews={item.reviews} />
              </div>
            </div>
          </div>
          <div className="pb-5">
            <Category
              name={item.category}
              url={`https://dummyjson.com/products/category/${item.category}`}
              id={item.id}
            />
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default page;
