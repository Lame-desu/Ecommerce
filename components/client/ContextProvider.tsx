"use client";

import { createContext, useContext, useEffect, useState } from "react";

type cartType = {
  isCartDialogOpen: boolean;
  setIsCartDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartId?: string;
  setCartId: React.Dispatch<React.SetStateAction<string | undefined>>;
  cartItems: Array<[string, number]> | [];
  setCartItems: React.Dispatch<
    React.SetStateAction<Array<[string, number]> | []>
  >;
  isOrderOpen: boolean;
  setIsOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Search = {
  query: any;
  setQuery: React.Dispatch<React.SetStateAction<any>>;
};

const CartContext = createContext<cartType>({
  isCartDialogOpen: false,
  setIsCartDialogOpen: () => {},
  cartId: undefined,
  setCartId: () => {},
  cartItems: [],
  setCartItems: () => {},
  setIsOrderOpen: () => {},
  isOrderOpen: false,
});

const SearchContext = createContext<Search>({ query: "", setQuery: () => {} });

export function useCart() {
  return useContext(CartContext);
}

export function useSearch() {
  return useContext(SearchContext);
}

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [isCartDialogOpen, setIsCartDialogOpen] = useState<boolean>(false);
  const [cartId, setCartId] = useState<string | undefined>();
  const [cartItems, setCartItems] = useState<Array<[string, number]> | []>([]);
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<any>("");

  useEffect(() => {
    const allItems = JSON.parse(String(localStorage.getItem("cartItems")));
    if (!allItems) return;
    setCartItems(Object.entries(allItems));
  }, []);

  return (
    <CartContext
      value={{
        isCartDialogOpen,
        setIsCartDialogOpen,
        cartId,
        setCartId,
        cartItems,
        setCartItems,
        isOrderOpen,
        setIsOrderOpen,
      }}
    >
      <SearchContext value={{ query, setQuery }}>{children}</SearchContext>
    </CartContext>
  );
}

export default ContextProvider;
