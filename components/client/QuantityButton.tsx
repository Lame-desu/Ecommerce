"use client";

import { useEffect, useState } from "react";
import { useCart } from "./ContextProvider";
import { BsFillBagFill } from "react-icons/bs";

type CartItem = { [key: string]: number };

function QuantityButton({
  item,
}: {
  item: { [key: string]: number | string | undefined };
}) {
  const [cartQuantity, setCartQuantity] = useState<number>(1);
  const [prevCartVal, setPrevCartVal] = useState<number>(0);

  const {
    setIsCartDialogOpen,
    setCartId,
    setCartItems,
    cartItems,
    setIsOrderOpen,
  } = useCart();

  useEffect(() => {
    const prev = JSON.parse(String(localStorage.getItem("cartItems")))?.[
      String(item.id)
    ];
    const val = prev ? prev : 0;
    setPrevCartVal(val);
  }, [cartItems]);

  function addToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const prevCartItems = JSON.parse(String(localStorage.getItem("cartItems")));
    const newVal: CartItem = prevCartItems
      ? {
          ...prevCartItems,
          [String(item.id)]: cartQuantity + prevCartVal,
        }
      : { [String(item.id)]: cartQuantity };

    localStorage.setItem("cartItems", JSON.stringify(newVal));
    setCartQuantity(1);
    setPrevCartVal(newVal?.[String(item.id)]);
    setIsCartDialogOpen(true);
    setCartId(String(item.id));
    setCartItems(Object.entries(newVal));
  }
  return (
    <div className="space-y-5">
      <div>
        <p>Quantity {prevCartVal ? `(${prevCartVal} in Cart)` : ""}</p>
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
                Number(e.target.value) > 0 ? Number(e.target.value) : 1
              )
            }
            className="w-14 h-12 focus:shadow-[0_0_0_3px_#616160] text-center outline-none"
          />
          <button
            onClick={() => setCartQuantity((p) => (p - 1 > 0 ? p - 1 : p))}
            className="w-14 h-12 cursor-pointer"
          >
            -
          </button>
        </div>
      </div>

      <button
        onClick={addToCart}
        className="text-center border-2 border-gray-700 w-full max-w-sm py-3 px-6 rounded-sm cursor-pointer"
      >
        Add to cart
      </button>
      <button
        onClick={() => {
          setIsOrderOpen(true);
        }}
        className="flex justify-center items-center gap-2 border-2 border-gray-700 w-full  max-w-sm py-3 px-6 text-white bg-black cursor-pointer"
      >
        <BsFillBagFill />
        <span>Order Now</span>
      </button>
    </div>
  );
}

export default QuantityButton;
