import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the SingleProductType interface (customize it as per your needs)
interface SingleProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  createdBy: { userName: string };
  image: string;
}

// Define the context type for SingleProductContext
interface SingleProductsContextType {
  singleProduct: SingleProductType | null; // Store the product or null if no product is set
  setSingleProduct: React.Dispatch<
    React.SetStateAction<SingleProductType | null>
  >; // State setter for singleProduct
}

// Create the context with an initial value of undefined
const SingleProductContext = createContext<
  SingleProductsContextType | undefined
>(undefined);

// Define the provider's props interface
interface SingleProductProviderProps {
  children: ReactNode;
}

// SingleProductProvider component
export const SingleProductProvider = ({
  children,
}: SingleProductProviderProps): JSX.Element => {
  const [singleProduct, setSingleProduct] = useState<SingleProductType | null>(
    null
  ); // Initial state as null

  return (
    <SingleProductContext.Provider value={{ singleProduct, setSingleProduct }}>
      {children}
    </SingleProductContext.Provider>
  );
};

// Custom hook to use the SingleProductContext
export const useSingleProduct = (): SingleProductsContextType => {
  const context = useContext(SingleProductContext);

  if (!context) {
    throw new Error(
      "useSingleProduct must be used within a SingleProductProvider"
    );
  }

  return context;
};
