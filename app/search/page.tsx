import SearchComponent from "@/components/client/SearchComponent";
import CategoryItemsGrid from "@/components/server/CategoryItemsGrid";
import Pagination from "@/components/server/Pagination";
import axios from "axios";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const query = params.q;
  const skip = params.skip;

  const res = await axios.get(
    `https://dummyjson.com/products/search?q=${query}&limit=8${
      skip ? `&skip=${skip}` : ""
    }`
  );
  const products = res.data.products;
  const total = res.data.total;
  return (
    <div className="flex justify-center items-center">
      <div className="w-[90vw] md:w-[75vw] space-y-14">
        <div className="w-full flex justify-center items-center py-16">
          <div className="w-full text-center space-y-8 px-4 md:px-16 md:w-[900px]">
            <h1 className="text-2xl">Search Results</h1>
            <SearchComponent />
          </div>
        </div>
        {total && Number(total) > 0 && (
          <>
            <p>
              {total} results found for “{query}”
            </p>
            <CategoryItemsGrid products={products} />
            <Pagination
              total={total}
              skip={skip ? Number(skip) : undefined}
              interval={8}
              query={query}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default page;
