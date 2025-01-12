import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the User interface (customize it as per your needs)
interface User {
  _id: string;
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

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/refreshtoken",
        {},
        { withCredentials: true }
      );
      console.log(res.data.user);
      setUser(res.data.user);
    } catch (error) {
      console.log("Error accured to refresh please login again", error);
    }
  };

  const getUser = () => {
    axios
      .post(
        "http://localhost:3000/api/v1/getuser",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setUser(res.data.user as User);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Access token is expired, refresh it
          console.log("Access token expired. Trying to refresh...");
          refreshToken();
        } else {
          console.log(err);
        }
        setUser(null); // Reset user if error occurs
      });
  };

  useEffect(() => {
    // Check localStorage for existing user on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      getUser(); // Fetch user if not found in localStorage
    }
  }, []); // Run only once on mount

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Remove user data on logout
    }
  }, [user]);

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
