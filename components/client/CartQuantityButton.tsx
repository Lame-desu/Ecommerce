"use client";

import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCart } from "./ContextProvider";

function CartQuantityButton({ id, qty }: { id: number; qty: number }) {
  const [cartQuantity, setCartQuantity] = useState<number>(qty);
  const { setCartItems } = useCart();

  useEffect(() => {
    const prevCartItems = JSON.parse(String(localStorage.getItem("cartItems")));
    if (cartQuantity > 0) {
      const updatedCartItems = { ...prevCartItems, [String(id)]: cartQuantity };
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(Object.entries(updatedCartItems));
    } else {
      const { [String(id)]: _, ...updatedCartItems } = prevCartItems;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(Object.entries(updatedCartItems));
    }
  }, [cartQuantity]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center border-[1.5px] border-gray-700 w-fit rounded-sm">
          <button
            onClick={() => setCartQuantity((p) => p + 1)}
            className="w-14 h-12 cursor-pointer"
          >
            +
          </button>
          <input
            type="number"
            value={cartQuantity}
            onChange={(e) =>
              setCartQuantity(
                Number(e.target.value) >= 0 ? Number(e.target.value) : 1
              )
            }
            className="w-14 h-12 focus:shadow-[0_0_0_3px_#616160] text-center outline-none"
          />
          <button
            onClick={() => setCartQuantity((p) => p - 1)}
            className="w-14 h-12 cursor-pointer"
          >
            -
          </button>
        </div>
        <button
          className="cursor-pointer p-4"
          onClick={() => setCartQuantity((p) => p - p)}
        >
          <RiDeleteBin5Line />
        </button>
      </div>
    </div>
  );
}

export default CartQuantityButton;
