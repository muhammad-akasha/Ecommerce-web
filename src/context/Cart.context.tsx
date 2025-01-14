import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the CartType interface (customize it as per your needs)
interface CartType {
  _id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  createdBy: { userName: string };
  image: string;
  quantity: number;
}

// Define the context type for CartContext
interface CartContextType {
  cart: CartType[] | null; // Array of CartType or null
  setCart: React.Dispatch<React.SetStateAction<CartType[] | null>>; // State setter for cart
  updateCart: (index: number, action: "increase" | "decrease") => void; // Update cart function
}

// Create the context with an initial value of undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the provider's props interface
interface CartContextProviderProps {
  children: ReactNode;
}

// CartProvider component
export const CartProvider = ({
  children,
}: CartContextProviderProps): JSX.Element => {
  // Initialize the cart state as an empty array or null
  const [cart, setCart] = useState<CartType[] | null>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Function to update cart quantity (increase/decrease)
  const updateCart = (index: number, action: "increase" | "decrease") => {
    setCart((prevCart) => {
      if (!prevCart) return prevCart; // Guard clause in case cart is null
      return prevCart.map((item, idx) => {
        if (idx === index) {
          const updatedQuantity =
            action === "increase" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(updatedQuantity, 1) }; // Ensure quantity doesn't go below 1
        }
        return item;
      });
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, updateCart }}>
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
