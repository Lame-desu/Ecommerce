import axios from "axios";
import CategoryItem from "./CategoryItem";
import Link from "next/link";

async function Category({
  name,
  url,
  id,
}: {
  name: string;
  url: string;
  id?: number;
}) {
  const res = await axios.get(`${url}?limit=${id ? 5 : 4}`);

  const data = id
    ? res.data.products.filter(
        (item: { [key: string]: string | number }) => item.id != id
      )
    : res.data.products;

  const [product1, product2, product3, product4] = data;
  return (
    <div className="flex flex-col gap-12 ">
      <h2 className="text-4xl font-normal">{id ? "Related Products" : name}</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="flex w-full flex-wrap gap-4 justify-center items-center flex-1">
          <div className="flex-1">
            {" "}
            {product1 && (
              <CategoryItem
                key={product1.id}
                title={product1.title}
                price={product1.price}
                imageUrl={product1.images[0]}
                id={product1.id}
              />
            )}
          </div>
          <div className="flex-1">
            {" "}
            {product2 && (
              <CategoryItem
                key={product2.id}
                title={product2.title}
                price={product2.price}
                imageUrl={product2.images[0]}
                id={product2.id}
              />
            )}
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-4 justify-center items-center flex-1">
          <div className="flex-1">
            {" "}
            {product3 && (
              <CategoryItem
                key={product3.id}
                title={product3.title}
                price={product3.price}
                imageUrl={product3.images[0]}
                id={product3.id}
              />
            )}
          </div>
          <div className="flex-1 min-w-32 min-h-32">
            {product4 && (
              <CategoryItem
                key={product4.id}
                title={product4.title}
                price={product4.price}
                imageUrl={product4.images[0]}
                id={product4.id}
              />
            )}
          </div>
        </div>
      </div>
      <Link
        href={`/category/${name.toLowerCase()}`}
        className="py-3 px-8 border-1 border-black hover:ring  rounded-sm self-center"
      >
        View All
      </Link>
    </div>
  );
}

export default Category;
