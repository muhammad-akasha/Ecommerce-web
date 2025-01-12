import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/theme";
import { useNavigate, Link } from "react-router-dom";
import { useAuthenticate } from "../context/userContext.auth.js";
import axios from "axios";
import { Spinner } from "../components/ui/spinner.js";
import { DropdownMenuRadioGroupDemo } from "./NavDropdown.tsx";
import { MdMenuOpen } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { useCart } from "../context/Cart.context.tsx";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const { user, setUser } = useAuthenticate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    axios
      .post(
        "http://localhost:3000/api/v1/logout",
        {},
        { withCredentials: true }
      )
      .then((res: object) => {
        console.log(res);
        setUser(null);
        navigate("/login");
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
          <div className="hidden md:flex space-x-10">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link to="/myproduct" className="block text-white">
              My-Product
            </Link>
            <Link to="/updateprofile" className="hover:text-gray-300">
              Update Profile
            </Link>
            <Link to="/addproduct" className="hover:text-gray-300">
              Add Product
            </Link>
          </div>
        </div>

        {/* Desktop Button (Login) */}
        <div className="flex gap-4 items-center text-black">
          {!user ? (
            <Spinner className="text-white" />
          ) : user ? (
            <>
              <DropdownMenuRadioGroupDemo logout={logout} />
              <Link to={"/order"}>
                <div className="relative">
                  <div className="flex justify-center items-center rounded-full bg-white text-black absolute top-[-8px] left-3 w-5 h-5 font-sans">
                    <h5>{cart && cart.length}</h5>
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
          {!user ? (
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
