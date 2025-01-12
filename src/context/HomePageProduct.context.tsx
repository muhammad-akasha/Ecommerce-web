import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the User interface (customize it as per your needs)
interface UserProduct {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  userName: string;
  name: string;
  image: string;
}

// Define the LoginUserContext type
interface UserProductsContextType {
  products: UserProduct[] | null; // Store the user object or null if no user is logged in
  setProducts: React.Dispatch<React.SetStateAction<UserProduct[] | null>>; // State setter for user
}

// Create the context with an initial value of undefined (meaning no context yet)
const HomePageProducts = createContext<UserProductsContextType | undefined>(
  undefined
);

// Define the provider's props interface
interface UserProductsProvider {
  children: ReactNode; // The children prop for the provider
}

// Define the LoginUserProvider component
export const HomeProductsProvider = ({
  children,
}: UserProductsProvider): JSX.Element => {
  const [products, setProducts] = useState<UserProduct[] | null>([]); // Initialize with null (no user logged in)

  const userProduct = async () => {
    try {
      const res = await axios("http://localhost:3000/api/v1/getuserads", {
        withCredentials: true,
      });
      console.log(res);
      setProducts(res.data.userAds);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!products) {
      userProduct();
    }
  }, []);

  return (
    <HomePageProducts.Provider value={{ products, setProducts }}>
      {children}
    </HomePageProducts.Provider>
  );
};

// Define the custom hook to use the authentication context
export const useHomeProducts = (): UserProductsContextType => {
  const context = useContext(HomePageProducts);

  if (!context) {
    throw new Error("useAuthenticate must be used within a LoginUserProvider");
  }

  return context;
};
