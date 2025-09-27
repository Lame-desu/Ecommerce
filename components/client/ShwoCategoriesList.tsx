"use client";
function ShowCategoriesList({
  categories,
}: {
  categories: Array<{ name: string; slug: string; url: string }>;
}) {
  return (
    <ul>
      {categories.map((category) => (
        <li
          key={category.slug}
          className="w-full py-3 px-6 hover:bg-[#EBEBEB] space-y-0.5 text-lg cursor-pointer transition-transform delay-300"
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default ShowCategoriesList;
