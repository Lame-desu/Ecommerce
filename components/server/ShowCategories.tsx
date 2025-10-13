import axios from "axios";
import Category from "./Category";

async function ShowCategories() {
  const res = await axios.get("https://dummyjson.com/products/categories");
  const categories = res.data;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="space-y-16 w-full pb-20 ">
        {categories &&
          categories.map(
            (category: { slug: string; name: string; url: string }) => (
              <Category
                key={category.slug}
                name={category.name}
                url={category.url}
              />
            )
          )}
      </div>
    </div>
  );
}

export default ShowCategories;
