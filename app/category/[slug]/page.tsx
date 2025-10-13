import CategoryItemsGrid from "@/components/server/CategoryItemsGrid";
import Pagination from "@/components/server/Pagination";
import axios from "axios";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { skip } = await searchParams;
  const { slug } = await params;
  const noSpaceSlug: string = slug.split("%20").join("-");
  const res = await axios.get(
    `https://dummyjson.com/products/category/${noSpaceSlug}?limit=8${
      skip ? `&skip=${skip}` : ""
    }`
  );
  const items = res.data;
  return (
    <div className="flex justify-center items-center mt-14">
      <div className="w-[75vw] space-y-14">
        <h1 className="text-4xl font-normal">{noSpaceSlug}</h1>
        <CategoryItemsGrid products={items.products} />
        <Pagination
          interval={8}
          total={items.total}
          slug={slug}
          skip={Number(skip)}
        />
      </div>
    </div>
  );
}

export default page;
