import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  openCart: () => void,
  closeCart: () => void,
  getItemQuantity: (id: number) => number
  increaseItemQuantity: (id: number) => void
  decreaseItemQuantity: (id: number) => void
  removeFromCart: (id: number) => void,
  cartQuantity: number,
  cartItems: CartItem[],
}

type CartItem = {
  id: number,
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const getItemQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  const increaseItemQuantity = (id: number) => {
    setCartItems(prevItems => {
      if (!prevItems.find(item => item.id === id)) {
        return [...prevItems, { id, quantity: 1 }];
      }
      return prevItems.map(item => {
        if (item.id === id) return { ...item, quantity: item.quantity + 1 };
        return item;
      });
    });
  }

  const decreaseItemQuantity = (id: number) => {
    setCartItems(prevItems => {
      if (prevItems.find(item => item.id === id)?.quantity === 1) {
        return prevItems.filter(item => item.id !== id);
      }
      return prevItems.map(item => {
        if (item.id === id) return { ...item, quantity: item.quantity - 1 };
        return item;
      });
    });
  }

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  }

  const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);

  return (
    <ShoppingCartContext.Provider value={{
      openCart,
      closeCart,
      getItemQuantity,
      increaseItemQuantity,
      decreaseItemQuantity,
      removeFromCart,
      cartItems,
      cartQuantity,
    }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
