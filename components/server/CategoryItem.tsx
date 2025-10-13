import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({
  title,
  price,
  imageUrl,
  id,
}: {
  title: string;
  price: number;
  imageUrl: string;
  id: number;
}) {
  return (
    <div className="space-y-2">
      {/* IMAGE CONTAINER: direct parent is relative and has a fixed/responsive height */}
      <Link href={`/product/${id}`} className="hover:underline cursor-pointer ">
        <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={`${title} image`}
            fill
            className="transition-transform  hover:transform-[scaleY(1.02)_scaleX(1.02)]"
            style={{ objectFit: "cover" }}
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>

        <p className="font-medium text-sm">{title}</p>
      </Link>

      {/* TEXT sits outside the relative container — won't overlap */}
      <div>
        <p className="text-medium  text-gray-900">
          Br
          {(price * 100).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          ETB
        </p>
      </div>
    </div>
  );
}
