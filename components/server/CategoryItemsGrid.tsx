import CategoryItem from "./CategoryItem";

function CategoryItemsGrid({ products }: { products: Array<any> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((item) => {
        return (
          <CategoryItem
            key={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.images[0]}
            id={item.id}
          />
        );
      })}
    </div>
  );
}

export default CategoryItemsGrid;
