import { Link } from "react-router-dom";
import { useCart } from "../context/Cart.context";
import AddOrDecreaseBtns from "./AddOrDecreaseBtns";
import { MdDeleteSweep } from "react-icons/md";
import axios from "axios";
import { api } from "../axios-interceptor/axios";
import { useState } from "react";
import Swal from "sweetalert2";

const CartAndOrder = () => {
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(false);

  const deleteCart = (index: number) => {
    if (cart) {
      cart?.splice(index, 1);
      setCart([...cart]);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const placeOrder = async () => {
    if (cart) {
      const products = cart.map((item) => {
        return { id: item._id, quantity: item.quantity };
      });
      if (products.length === 0) {
        return Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: `Your cart is empty.`,
        });
      }
      setLoading(true);
      try {
        const res = await api.post("placeorder", { products });
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-semibold my-6 text-gray-800 dark:text-white">
        Cart Items
      </h2>
      <div className="flex flex-col md:flex-row gap-5 my-6 mx-3 md:mx-20">
        <div className="w-full md:w-[70%]">
          {cart && cart.length > 0 ? (
            cart.map((item, index) => {
              return (
                <div
                  key={item._id}
                  className="shadow-lg border-2 rounded-md flex flex-col md:flex-row items-start md:items-center justify-between p-3 gap-5 md:gap-2 bg-white dark:bg-gray-800"
                >
                  <Link
                    to={`/product/${item._id}`}
                    className="border-white rounded-md flex flex-col md:flex-row justify-start items-start md:items-center gap-5"
                  >
                    <div>
                      <img
                        className="w-full md:w-32 h-32 object-cover"
                        src={item.image}
                        alt="item"
                      />
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-white">
                      <h3 className="font-bold" style={{ letterSpacing: 2 }}>
                        {item.name}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Price: {item.price}
                      </p>
                    </div>
                  </Link>
                  <div>
                    <MdDeleteSweep
                      onClick={() => {
                        deleteCart(index);
                      }}
                      className="cursor-pointer text-gray-800 dark:text-white"
                      fontSize={25}
                    />
                  </div>
                  <div>
                    <AddOrDecreaseBtns index={index} quantity={item.quantity} />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-800 dark:text-white">
              Your cart is empty!
            </p>
          )}
        </div>
        <div className="border-2 border-gray-200 shadow-lg rounded-lg w-full md:w-[30%] h-fit p-8 bg-white dark:bg-gray-800">
          <h3 className="text-center font-semibold text-xl text-gray-800 dark:text-white mb-4">
            Order Details
          </h3>

          <h5 className="text-center text-gray-600 dark:text-gray-300 mb-2">
            Total Items:
            {cart && cart.reduce((total, item) => total + item.quantity, 0)}
          </h5>

          <div className="mb-4 text-center">
            <h6 className="text-gray-700 dark:text-gray-300 text-center">
              Total Price:
            </h6>
            <strong className="text-lg text-green-600 dark:text-green-400">
              RS.
              {cart
                ?.reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </strong>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={placeOrder}
              disabled={loading}
              className={`bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 
              ${loading ? "bg-blue-300 cursor-not-allowed" : ""}`}
            >
              {loading ? "Ordering..." : "Order Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartAndOrder;
