import axios from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the CartType interface (customize it as per your needs)
interface CartType {
  _id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  createdBy: { userName: string };
  image: string;
}

// Define the context type for CartContext
interface CartContextType {
  cart: CartType[] | null; // Array of CartType or null
  setCart: React.Dispatch<React.SetStateAction<CartType[] | null>>; // State setter for cart
}

// Create the context with an initial value of undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the provider's props interface
interface CartContextProvider {
  children: ReactNode;
}

// CartProvider component
export const CartProvider = ({
  children,
}: CartContextProvider): JSX.Element => {
  // Initialize the cart state as an empty array or null
  const [cart, setCart] = useState<CartType[] | null>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
