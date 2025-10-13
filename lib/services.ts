import axios from "axios";

export async function calculateTotal(
  id: string,
  total: number
): Promise<number> {
  const res = await axios.get(
    `https://dummyjson.com/products/${id}?select=price`
  );
  const price = res.data.price;
  return price * total * 100;
}
