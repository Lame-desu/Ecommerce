import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CartQuantityButton from "./CartQuantityButton";
import Link from "next/link";
import LinearLoading from "../server/LinearLoading";

export default function CartItem({ item }: { item: [string, number] }) {
  const [itemInfo, setItemInfo] = useState<any>(null);
  const [id, qty] = item;
  useEffect(() => {
    async function fetchItem() {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setItemInfo(res.data);
    }
    fetchItem();
  }, []);

  if (!itemInfo) return <LinearLoading />;

  return (
    <tr>
      <td className="md:pr-13">
        <div className="grid grid-cols-3 md:flex gap-7 items-center">
          <div className="relative max-w-32 max-h-32 min-w-24 min-h-24">
            {itemInfo && (
              <Image
                src={itemInfo?.images[0]}
                alt="product image"
                width={500}
                height={500}
              />
            )}
          </div>
          <div className="space-y-2">
            <Link className="hover:underline" href={`/product/${itemInfo.id}`}>
              {itemInfo.title}
            </Link>
            <p className="text-medium  text-gray-600">
              Br
              {(itemInfo.price * 100).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ETB
            </p>
          </div>
          <div className="md:hidden text-end self-start">
            Br
            {(itemInfo.price * qty * 100).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="md:hidden col-start-2 col-end-4">
            <CartQuantityButton id={itemInfo.id} qty={qty} />
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell pr-12 pt-3 align-middle">
        <CartQuantityButton id={itemInfo.id} qty={qty} />
      </td>
      <td className="hidden md:table-cell text-end">
        Br
        {(itemInfo.price * qty * 100).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
    </tr>
  );
}
