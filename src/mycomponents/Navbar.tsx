import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/theme";
import { Link } from "react-router-dom";
import { useAuthenticate } from "../context/userContext.auth.js";
import { Spinner } from "../components/ui/spinner.js";
import { DropdownMenuRadioGroupDemo } from "./NavDropdown.tsx";
import { MdMenuOpen } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { useCart } from "../context/Cart.context.tsx";
import { api } from "../axios-interceptor/axios.ts";

function Navbar() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const { user, setUser } = useAuthenticate();

  const refreshToken = async () => {
    setLoading(true);
    try {
      const res = await api.post("refreshtoken");
      console.log(res.data.user);
      setUser(res.data.user);
    } catch (error) {
      console.log("Error accured to refresh please login again", error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = () => {
    setLoading(true);
    api
      .get("getuser")
      .then((res) => {
        console.log(res);
        setUser(res.data.user);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // Check localStorage for existing user on initial load
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      getUser(); // Fetch user if not found in localStorage
    }
    setLoading(false);
  }, []); // Run only once on mount

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Remove user data on logout
    }
  }, [user]);

  const logout = () => {
    api
      .post("logout")
      .then((res: object) => {
        console.log(res);
        setUser(null);
      })
      .catch((err: object) => console.log(err));
  };

  return (
    <div>
      <div className="bg-gray-800 text-white p-4 flex justify-between">
        {/* Navbar Container */}
        <div className="max-w-7xl flex gap-8 items-center">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl">
            MyLogo
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4 lg:space-x-10 text-sm md:text-[15px]">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link
              to={!user ? "/login" : `/myproduct`}
              className="block text-white"
            >
              My-Product
            </Link>
            <Link
              to={!user ? "/login" : "/updateprofile"}
              className="hover:text-gray-300"
            >
              Update Profile
            </Link>
            <Link
              to={!user ? "/login" : "/addproduct"}
              className="hover:text-gray-300"
            >
              Add Product
            </Link>
            <Link
              to={!user ? "/login" : "/order"}
              className="hover:text-gray-300"
            >
              Your Orders
            </Link>
          </div>
        </div>

        {/* Desktop Button (Login) */}
        <div className="flex gap-4 items-center text-black">
          {loading ? (
            <Spinner className="text-white" />
          ) : user ? (
            <>
              <DropdownMenuRadioGroupDemo logout={logout} />
              <Link to={"/cart"}>
                <div className="relative">
                  <div className="flex justify-center items-center rounded-full bg-white text-black absolute top-[-8px] left-3 w-5 h-5 font-sans">
                    <h5>
                      {cart &&
                        cart.reduce((total, item) => total + item.quantity, 0)}
                    </h5>
                  </div>
                  <BsCart4 fontSize={24} className="text-white" />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link className="hidden md:flex" to="/login">
                <Button className="bg-white" variant="outline" color="white">
                  Login
                </Button>
              </Link>
              <Link className="hidden md:flex" to="/signup">
                <Button className="bg-white" variant="outline" color="white">
                  Signup
                </Button>
              </Link>
            </>
          )}
          <ModeToggle />
          {/* Mobile Menu Button */}
          <div
            onClick={() => setOpen(!open)}
            className="md:hidden bg-white p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
          >
            <MdMenuOpen fontSize={22} className="text-black" />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden space-y-4 bg-gray-700 p-4">
          <Link to="/" className="block text-white">
            Home
          </Link>
          <Link to="/myproduct" className="block text-white">
            My-Product
          </Link>
          <Link to="/updateprofile" className="block text-white">
            Update Profile
          </Link>
          <Link to="/addproduct" className="block text-white">
            Add Product
          </Link>
          <Link to="/order" className="hover:text-gray-300">
            Your Orders
          </Link>
          {loading ? (
            <Spinner className="text-white" />
          ) : user ? (
            <>
              <Button className="bg-white" variant="outline" color="white">
                Orders
              </Button>
            </>
          ) : (
            <>
              <Link className="hidden md:flex" to="/login">
                <Button className="bg-white" variant="outline" color="white">
                  Login
                </Button>
              </Link>
              <Link className="hidden md:flex" to="/signup">
                <Button className="bg-white" variant="outline" color="white">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
