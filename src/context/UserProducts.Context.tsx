import React, { createContext, useContext, useState, ReactNode } from "react";

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
const UserProductContext = createContext<UserProductsContextType | undefined>(
  undefined
);

// Define the provider's props interface
interface UserProductsProvider {
  children: ReactNode; // The children prop for the provider
}

// Define the LoginUserProvider component
export const UserProductsProvider = ({
  children,
}: UserProductsProvider): JSX.Element => {
  const [products, setProducts] = useState<UserProduct[] | null>([]); // Initialize with null (no user logged in)

  return (
    <UserProductContext.Provider value={{ products, setProducts }}>
      {children}
    </UserProductContext.Provider>
  );
};

// Define the custom hook to use the authentication context
export const useProducts = (): UserProductsContextType => {
  const context = useContext(UserProductContext);

  if (!context) {
    throw new Error("useAuthenticate must be used within a LoginUserProvider");
  }

  return context;
};
