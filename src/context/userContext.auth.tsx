import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User interface (customize it as per your needs)
interface User {
  _id: string;
  image: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  orders: [];
  userName: string;
}

// Define the LoginUserContext type
interface LoginUserContextType {
  user: User | null; // Store the user object or null if no user is logged in
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // State setter for user
}

// Create the context with an initial value of undefined (meaning no context yet)
const loggedInUserContext = createContext<LoginUserContextType | undefined>(
  undefined
);

// Define the provider's props interface
interface LoginUserProviderProps {
  children: ReactNode; // The children prop for the provider
}

// Define the LoginUserProvider component
export const LoginUserProvider = ({
  children,
}: LoginUserProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null); // Initialize with null (no user logged in)

  return (
    <loggedInUserContext.Provider value={{ user, setUser }}>
      {children}
    </loggedInUserContext.Provider>
  );
};

// Define the custom hook to use the authentication context
export const useAuthenticate = (): LoginUserContextType => {
  const context = useContext(loggedInUserContext);

  if (!context) {
    throw new Error("useAuthenticate must be used within a LoginUserProvider");
  }

  return context;
};
